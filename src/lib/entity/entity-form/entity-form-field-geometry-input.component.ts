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
import { MatFormFieldControl } from '@angular/material';

import { Subject, Subscription } from 'rxjs';

import { FeatureGeometry as GeoJSONGeometry } from '@igo2/geo';

import OlGeoJSON from 'ol/format/GeoJSON';
import OlGeometry from 'ol/geom/Geometry';
import OlGeometryType from 'ol/geom/GeometryType';
import OlFeature from 'ol/Feature';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';

import { IgoMap, DrawControl, ModifyControl } from 'src/lib/map';


/**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map. A text input is also displayed in the
 * form with some instructions.
 * This is still WIP.
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
  private olGeoJSON = new OlGeoJSON();
  private ready = false;

  private drawControl: DrawControl;
  private modifyControl: ModifyControl;
  private olGeometry$: Subscription;

  /**
   * Active control
   * @internal
   */
  public activeControl: DrawControl | ModifyControl;

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

    this._value = value;
    this.onChange(value);
    this.toggleControl();
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
    this.createDrawControl();
    this.createModifyControl();
    if (this.value !== undefined) {
      this.addGeoJSONToOverlay(this.value);
    }
    this.toggleControl();
    this.ready = true;
  }

  /**
   * Clear the overlay layer and any interaction added by this component.
   * @internal
   */
  ngOnDestroy() {
    this.deactivateControl();
    this.olOverlaySource.clear();
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
   * Create a draw control and subscribe to it's geometry
   */
  private createDrawControl() {
    this.drawControl = new DrawControl({
      geometryType: this.geometryType,
      layer: this.olOverlayLayer
    });
  }

  /**
   * Create a modify control and subscribe to it's geometry
   */
  private createModifyControl() {
    this.modifyControl = new ModifyControl({
      layer: this.olOverlayLayer
    });
  }

  /**
   * Toggle the proper control (draw or modify)
   */
  private toggleControl() {
    this.deactivateControl();
    if (this.value === undefined) {
      this.activateControl(this.drawControl);
    } else if (this.value !== undefined) {
      this.activateControl(this.modifyControl);
    }
  }

  /**
   * Activate a given control
   * @param control Control
   */
  private activateControl(control: DrawControl | ModifyControl) {
    this.activeControl = control;
    this.olGeometry$ = control.end$
      .subscribe((olGeometry: OlGeometry) => this.setOlGeometry(olGeometry));
    control.setMap(this.map.ol);
  }

  /**
   * Deactivate the active control
   */
  private deactivateControl() {
    if (this.activeControl !== undefined) {
      this.activeControl.setMap(undefined);
    }
    if (this.olGeometry$ !== undefined) {
      this.olGeometry$.unsubscribe();
    }
    this.activeControl = undefined;
  }

  /**
   * When drawing ends, convert the output value to GeoJSON and keep it.
   * Restore the double click interaction.
   * @param olGeometry OL geometry
   */
  private setOlGeometry(olGeometry: OlGeometry | undefined) {
    if (olGeometry === undefined) {
      return;
    }
    const value = this.olGeoJSON.writeGeometryObject(olGeometry, {
      featureProjection: this.map.projection,
      dataProjection: this.projection
    });
    this.writeValue(value);
  }

  /**
   * Add a GeoJSON geometry to the overlay
   * @param geometry GeoJSON geometry
   */
  private addGeoJSONToOverlay(geometry: GeoJSONGeometry) {
    const olGeometry = this.olGeoJSON.readGeometry(geometry, {
      dataProjection: this.projection,
      featureProjection: this.map.projection
    });
    const olFeature = new OlFeature({geometry: olGeometry});
    this.olOverlaySource.clear();
    this.olOverlaySource.addFeature(olFeature);
  }
}
