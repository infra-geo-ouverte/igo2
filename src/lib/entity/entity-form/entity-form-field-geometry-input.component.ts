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

/**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map. A text input is also displayed in the
 * form with some instructions.
 * This is still WIP.
 * TODO: Split into smaller class/functions
 * TODO: Support different geometry type
 */
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

  /**
   * Id genrator needed to implement the MatFormFieldControl interface
   * @internal
   */
  static nextId = 0;

  /**
   * Implemented as part of MatFormFieldControl.
   * @internal
   */
  public focused = false;

  /**
   * Implemented as part of MatFormFieldControl.
   * @internal
   */
  public errorState = false;

  /**
   * Implemented as part of MatFormFieldControl.
   * @internal
   */
  readonly controlType = 'geometry-input';

  /**
   * Implemented as part of MatFormFieldControl.
   * @internal
   */
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
   * The geometry value (GeoJSON)
   * Implemented as part of ControlValueAccessor.
   */
  @Input()
  set value(value: GeoJSONGeometry) {
    if (value === null) {
      value = undefined;
    }
    if (this.ready === false) {
      this._value = value;
      return;
    }

    this.onChange(value);
    this._value = value;
    this.toggleInteraction();
    this.cdRef.detectChanges();
  }
  get value(): GeoJSONGeometry { return this._value; }
  private _value: GeoJSONGeometry;

  /**
   * The map to draw the geometry on
   */
  @Input() map: IgoMap;

  /**
   * The geometry type
   */
  @Input() geometryType: OlGeometryType;

  /**
   * The geometry projection
   */
  @Input() projection: string = 'EPSG:4326';

  /**
   * Field tooltip
   * Implemented as part of MatFormFieldControl.
   */
  @Input()
  set tooltip(value: string) {
    this._tooltip = value;
    this.stateChanges.next();
  }
  get tooltip(): string { return this._tooltip; }
  private _tooltip: string;

  /**
   * Field placeholder
   * Implemented as part of MatFormFieldControl.
   */
  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  get placeholder(): string { return this._placeholder; }
  private _placeholder: string;

  /**
   * Whether this is required
   * Implemented as part of MatFormFieldControl.
   */
  @Input()
  set required(value: boolean) {
    this._required = value;
    this.stateChanges.next();
  }
  get required(): boolean { return this._required; }
  private _required = false;

  /**
   * Whether this is disabled
   * Implemented as part of MatFormFieldControl.
   */
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    this.stateChanges.next();
  }
  get disabled(): boolean { return this._disabled; }
  private _disabled = false;

  /**
   * Implemented as part of MatFormFieldControl.
   * @ignore
   */
  @HostBinding()
  id = `geometry-input-${EntityFormFieldGeometryInputComponent.nextId++}`;

  /**
   * Implemented as part of MatFormFieldControl.
   * @ignore
   */
  @HostBinding('attr.aria-describedby')
  describedBy = '';

  /**
   * Implemented as part of MatFormFieldControl.
   * @ignore
   */
  @HostBinding('class.floating')
  get shouldLabelFloat() { return this.representation.length > 0; }

  /**
   * Implemented as part of MatFormFieldControl.
   * @internal
   */
  get empty() { return this.value === undefined; }

  /**
   * The vector source to add the geometry to
   * @internal
   */
  get olOverlaySource(): OlVectorSource {
    return this.olOverlayLayer.getSource();
  }

  /**
   * The geometry representation displayed in the field
   * @internal
   */
  get representation(): string {
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

  /**
   * Create an overlay layer, add the initial geometry to it (if any)
   * and toggle the right interaction.
   * @internal
   */
  ngOnInit() {
    this.addOlOverlayLayer();
    if (this.value !== undefined) {
      this.addGeometryToOverlay(this.value);
    }
    this.toggleInteraction();
    this.ready = true;
  }

  /**
   * Clear the overlay layer and any interaction added by this component.
   * @internal
   */
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

  /**
   * Add an overlay layer to the map
   */
  private addOlOverlayLayer(): OlVectorLayer {
    this.olOverlayLayer = new OlVectorLayer({
      source: new OlVectorSource(),
      zIndex: 500
    });

    this.map.ol.addLayer(this.olOverlayLayer);
  }

  /**
   * Add a GeoJSON geometry to the overlay
   * @param geometry GeoJSON geometry
   */
  private addGeometryToOverlay(geometry: GeoJSONGeometry) {
    const olGeometry = this.olGeoJSON.readGeometry(geometry, {
      dataProjection: this.projection,
      featureProjection: this.map.projection
    });
    const olFeature = new OlFeature({geometry: olGeometry});
    this.olOverlaySource.clear();
    this.olOverlaySource.addFeature(olFeature);
  }

  /**
   * Add a draw interaction to the map an set up some listeners
   */
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

  /**
   * Remove the draw interaction
   */
  private removeOlDrawInteraction() {
    if (this.olDrawInteraction === undefined) {
      return;
    }

    unByKey(this.onDrawStartKey);
    unByKey(this.onDrawEndKey);
    this.map.ol.removeInteraction(this.olDrawInteraction);
    this.olDrawInteraction = undefined;
  }

  /**
   * When drawing starts, remove 'double click to zoom' interaction
   * from the map because double is used to complete the drawing.
   * @param event Draw start event
   */
  private onDrawStart(event) {
    this.removeOlDoubleClickZoomInteraction();
  }

  /**
   * When drawing ends, convert the output value to GeoJSON and keep it.
   * Restore the double click interaction.
   * @param event Draw end event
   */
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

  /**
   * Add a modify interaction to the map an set up some listeners
   */
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

  /**
   * Remove the modify interaction
   */
  private removeOlModifyInteraction() {
    if (this.olModifyInteraction === undefined) {
      return;
    }

    unByKey(this.onModifyEndKey);
    this.map.ol.removeInteraction(this.olModifyInteraction);
    this.olModifyInteraction = undefined;
  }

  /**
   * When modification ends, convert the output value to GeoJSON and keep it.
   * @param event Modify end event
   */
  private onModifyEnd(event) {
    const geometry = event.features.item(0).getGeometry();
    const value = this.olGeoJSON.writeGeometryObject(geometry, {
      featureProjection: this.map.projection,
      dataProjection: this.projection
    });
    this.writeValue(value);
  }

  /**
   * Add a translate interaction to the map an set up some listeners
   */
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

  /**
   * Remove the translate interaction
   */
  private removeOlTranslateInteraction() {
    if (this.olTranslateInteraction === undefined) {
      return;
    }

    unByKey(this.onTranslateEndKey);
    this.map.ol.removeInteraction(this.olTranslateInteraction);
    this.olTranslateInteraction = undefined;
  }

  /**
   * When translation ends, convert the output value to GeoJSON and keep it.
   * @param event Translate end event
   */
  private onTranslateEnd(event) {
    const geometry = event.features.item(0).getGeometry();
    const value = this.olGeoJSON.writeGeometryObject(geometry, {
      featureProjection: this.map.projection,
      dataProjection: this.projection
    });
    this.writeValue(value);
  }

  /**
   * Remove 'double click to zoom' interaction and keep a reference
   * to it for futur restoration.
   */
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

  /**
   * Restore 'double click to zoom' interaction if there was one in the first place
   */
  private restoreDoubleClickZoomInteraction() {
    if (this.olDoubleClickZoomInteraction !== undefined) {
      this.map.ol.addInteraction(this.olDoubleClickZoomInteraction);
    }
    this.olDoubleClickZoomInteraction = undefined;
  }

  /**
   * Toggle the proper interaction (draw or modify + translate)
   */
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
