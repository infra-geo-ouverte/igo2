import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  HostBinding,
  Optional,
  Self,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';

import { Subject } from 'rxjs';

import { FeatureGeometry as GeoJSONGeometry } from '@igo2/geo';

import OlGeoJSON from 'ol/format/GeoJSON';
import OlGeometryType from 'ol/geom/GeometryType';
import OlFeature from 'ol/Feature';
import OlInteraction from 'ol/interaction/Interaction';
import OlDoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import OlDraw from 'ol/interaction/Draw';
import OlModify from 'ol/interaction/Modify';
import OlTranslate from 'ol/interaction/Translate';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import { unByKey } from 'ol/Observable';

import { IgoMap } from 'src/lib/map';
import { MatFormFieldControl } from '@angular/material';

@Component({
  selector: 'fadq-entity-form-field-geometry-input',
  templateUrl: './entity-form-field-geometry-input.component.html',
  providers: [{
    provide: MatFormFieldControl,
    useExisting: EntityFormFieldGeometryInputComponent
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityFormFieldGeometryInputComponent
  implements OnInit, OnDestroy, ControlValueAccessor {

  static nextId = 0;

  /**
   * Implemented as part of MatFormFieldControl.
   */
  public focused = false;
  public errorState = false;
  readonly controlType = 'geometry-input';
  readonly stateChanges = new Subject<void>();

  private olOverlayLayer: OlVectorLayer;
  private olDrawInteraction: OlDraw;
  private onDrawStartKey: string;
  private onDrawEndKey: string;
  private olModifyInteraction: OlDraw;
  private onModifyEndKey: string;
  private olTranslateInteraction: OlDraw;
  private onTranslateEndKey: string;
  private olDoubleClickZoomInteraction: OlDoubleClickZoom;
  private olGeoJSON = new OlGeoJSON();
  private ready = false;

  /**
   * Implemented as part of ControlValueAccessor.
   */
  @Input()
  get value(): GeoJSONGeometry {
    return this._value;
  }
  set value(value: GeoJSONGeometry) {
    if (this.ready === false) {
      this._value = value;
      return;
    }

    this.onChange(value);
    this._value = value;
    this.toggleInteraction();
    this.cdRef.detectChanges();
  }
  private _value: GeoJSONGeometry;

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map: IgoMap;

  @Input()
  get geometryType(): OlGeometryType {
    return this._geometryType;
  }
  set geometryType(value: OlGeometryType) {
    this._geometryType = value;
  }
  private _geometryType: OlGeometryType;

  @Input()
  get projection(): string {
    return this._projection;
  }
  set projection(value: string) {
    this._projection = value;
  }
  private _projection = 'EPSG:4326';

  @Input()
  get tooltip(): string {
    return this._tooltip;
  }
  set tooltip(value: string) {
    this._tooltip = value;
    this.stateChanges.next();
  }
  private _tooltip: string;

  /**
   * Implemented as part of MatFormFieldControl.
   */
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  /**
   * Implemented as part of MatFormFieldControl.
   */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = value;
    this.stateChanges.next();
  }
  private _required = false;

  /**
   * Implemented as part of MatFormFieldControl.
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    this.stateChanges.next();
  }
  private _disabled = false;

  /**
   * Implemented as part of MatFormFieldControl.
   */
  @HostBinding()
  id = `geometry-input-${EntityFormFieldGeometryInputComponent.nextId++}`;

  /**
   * Implemented as part of MatFormFieldControl.
   */
  @HostBinding('attr.aria-describedby')
  describedBy = '';

  /**
   * Implemented as part of MatFormFieldControl.
   */
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.representation.length > 0;
  }

  /**
   * Implemented as part of MatFormFieldControl.
   */
  get empty() {
    return this.value === undefined;
  }

  get olOverlaySource(): OlVectorSource {
    return this.olOverlayLayer.getSource();
  }

  get representation(): string {
    if (this.value !== undefined) {
      return this.geometryType + '...';
    }
    return this.tooltip || '...';
  }

  constructor(
    private cdRef: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl !== undefined) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.addOlOverlayLayer();
    if (this.value !== undefined) {
      const geometry = this.olGeoJSON.readGeometry(this.value, {
        dataProjection: this.projection,
        featureProjection: this.map.projection
      });
      const feature = new OlFeature({geometry});
      this.olOverlaySource.clear();
      this.olOverlaySource.addFeature(feature);
    }
    this.toggleInteraction();

    this.ready = true;
  }

  ngOnDestroy() {
    this.restoreDoubleClickZoomInteraction();
    this.removeOlDrawInteraction();
    this.removeOlModifyInteraction();
    this.removeOlTranslateInteraction();
    this.map.ol.removeLayer(this.olOverlayLayer);
    this.stateChanges.complete();
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  registerOnChange(fn: Function) {
    this.onChange = fn;
  }
  private onChange: any = () => {};

  /**
   * Implemented as part of ControlValueAccessor.
   */
  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }
  private onTouched: any = () => {};

  /**
   * Implemented as part of ControlValueAccessor.
   */
  writeValue(value: GeoJSONGeometry) {
    if (value) {
      this.value = value;
    }
  }

  /**
   * Implemented as part of MatFormFieldControl.
   */
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  /**
   * Implemented as part of MatFormFieldControl.
   */
  onContainerClick(event: MouseEvent) {}

  private addOlOverlayLayer(): OlVectorLayer {
    this.olOverlayLayer = new OlVectorLayer({
      source: new OlVectorSource(),
      zIndex: 500
    });
    this.map.ol.addLayer(this.olOverlayLayer);
  }

  private addOlDrawInteraction() {
    const olDrawInteraction = new OlDraw({
      type: this.geometryType,
      source: this.olOverlaySource
    });

    this.onDrawStartKey = olDrawInteraction.on('drawstart', (event) => {
      this.onDrawStart(event);
    });
    this.onDrawEndKey = olDrawInteraction.on('drawend', (event) => {
      this.onDrawEnd(event);
    });
    this.map.ol.addInteraction(olDrawInteraction);
    this.olDrawInteraction = olDrawInteraction;
  }

  private removeOlDrawInteraction() {
    if (this.olDrawInteraction === undefined) {
      return;
    }

    unByKey(this.onDrawStartKey);
    unByKey(this.onDrawEndKey);
    this.map.ol.removeInteraction(this.olDrawInteraction);
    this.olDrawInteraction = undefined;
  }

  private onDrawStart(event) {
    this.removeOlDoubleClickZoomInteraction();
  }

  private onDrawEnd(event) {
    const geometry = event.feature.getGeometry();
    const value = this.olGeoJSON.writeGeometryObject(geometry, {
      featureProjection: this.map.projection,
      dataProjection: this.projection
    });
    this.writeValue(value);

    // We need to wrap this in a setTimeout otherwise, the
    // double click to finish drawing will still trigger a zoom
    window.setTimeout(() => {
      this.restoreDoubleClickZoomInteraction();
    }, 50);
  }

  private addOlModifyInteraction() {
    const olModifyInteraction = new OlModify({
      source: this.olOverlaySource
    });

    this.onModifyEndKey = olModifyInteraction.on('modifyend', (event) => {
      this.onModifyEnd(event);
    });
    this.map.ol.addInteraction(olModifyInteraction);
    this.olModifyInteraction = olModifyInteraction;
  }

  private removeOlModifyInteraction() {
    if (this.olModifyInteraction === undefined) {
      return;
    }

    unByKey(this.onModifyEndKey);
    this.map.ol.removeInteraction(this.olModifyInteraction);
    this.olModifyInteraction = undefined;
  }

  private onModifyEnd(event) {
    const geometry = event.features.item(0).getGeometry();
    const value = this.olGeoJSON.writeGeometryObject(geometry, {
      featureProjection: this.map.projection,
      dataProjection: this.projection
    });
    this.writeValue(value);
  }

  private addOlTranslateInteraction() {
    const olTranslateInteraction = new OlTranslate({
      layers: [this.olOverlayLayer]
    });

    this.onTranslateEndKey = olTranslateInteraction.on('translateend', (event) => {
      this.onTranslateEnd(event);
    });
    this.map.ol.addInteraction(olTranslateInteraction);
    this.olTranslateInteraction = olTranslateInteraction;
  }

  private removeOlTranslateInteraction() {
    if (this.olTranslateInteraction === undefined) {
      return;
    }

    unByKey(this.onTranslateEndKey);
    this.map.ol.removeInteraction(this.olTranslateInteraction);
    this.olTranslateInteraction = undefined;
  }

  private onTranslateEnd(event) {
    const geometry = event.features.item(0).getGeometry();
    const value = this.olGeoJSON.writeGeometryObject(geometry, {
      featureProjection: this.map.projection,
      dataProjection: this.projection
    });
    this.writeValue(value);
  }

  private removeOlDoubleClickZoomInteraction() {
    const olInteractions = this.map.ol.getInteractions().getArray();
    const olDoubleClickZoomInteraction = olInteractions
      .find((olInteraction: OlInteraction) => {
        return olInteraction instanceof OlDoubleClickZoom;
      });

    if (olDoubleClickZoomInteraction !== undefined) {
      this.map.ol.removeInteraction(olDoubleClickZoomInteraction);
    }
    this.olDoubleClickZoomInteraction = olDoubleClickZoomInteraction;
  }

  private restoreDoubleClickZoomInteraction() {
    if (this.olDoubleClickZoomInteraction !== undefined) {
      this.map.ol.addInteraction(this.olDoubleClickZoomInteraction);
    }
    this.olDoubleClickZoomInteraction = undefined;
  }

  private toggleInteraction() {
    if (this.value === undefined && this.olDrawInteraction === undefined) {
      this.removeOlModifyInteraction();
      this.removeOlTranslateInteraction();
      this.addOlDrawInteraction();
    } else if (this.value !== undefined && this.olModifyInteraction === undefined) {
      this.removeOlDrawInteraction();
      this.addOlTranslateInteraction();
      this.addOlModifyInteraction();
    }
  }
}
