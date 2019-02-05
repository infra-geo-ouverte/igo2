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

import { Subscription } from 'rxjs';

import { OlStyle } from 'ol/Style';

import { FeatureGeometry as GeoJSONGeometry } from '@igo2/geo';

import OlGeoJSON from 'ol/format/GeoJSON';
import OlGeometry from 'ol/geom/Geometry';
import OlGeometryType from 'ol/geom/GeometryType';
import OlFeature from 'ol/Feature';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';

import { IgoMap, DrawControl, ModifyControl, createDrawInteractionStyle } from 'src/lib/map';

/**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map. A text input is also displayed in the
 * form with some instructions.
 * This is still WIP.
 */
@Component({
  selector: 'fadq-geometry-form-field-input',
  templateUrl: './geometry-form-field-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeometryFormFieldInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private olOverlayLayer: OlVectorLayer;
  private olGeoJSON = new OlGeoJSON();
  private ready = false;

  private drawControl: DrawControl;
  private modifyControl: ModifyControl;
  private drawInteractionStyle: OlStyle;
  private olGeometry$: Subscription;

  /**
   * Active control
   * @internal
   */
  public activeControl: DrawControl | ModifyControl;

  /**
   * The map to draw the geometry on
   */
  @Input() map: IgoMap;

  /**
   * The geometry type
   */
  @Input()
  set geometryType(value: OlGeometryType) {
    this._geometryType = value;
    if (this.ready === false) {
      return;
    }

    this.deactivateControl();
    this.createDrawControl();
    this.toggleControl();
  }
  get geometryType(): OlGeometryType { return this._geometryType; }
  private _geometryType: OlGeometryType;

  /**
   * The buffer around the mouse pointer to help drawing
   */
  @Input() buffer: number = 0;

  /**
   * The geometry value (GeoJSON)
   * Implemented as part of ControlValueAccessor.
   */
  @Input()
  set value(value: GeoJSONGeometry) {
    value = value === null ? undefined : value;
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
   * The vector source to add the geometry to
   * @internal
   */
  get olOverlaySource(): OlVectorSource {
    return this.olOverlayLayer.getSource();
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
    this.drawInteractionStyle = createDrawInteractionStyle();
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
      layer: this.olOverlayLayer,
      drawStyle: (olFeature: OlFeature, resolution: number) => {
        const style = this.drawInteractionStyle;
        const buffer = this.buffer;
        if (buffer > 0) {
          style.getImage().setRadius(buffer / resolution);
        }
        return style;
      }
    });
  }

  /**
   * Create a modify control and subscribe to it's geometry
   */
  private createModifyControl() {
    this.modifyControl = new ModifyControl({
      layer: this.olOverlayLayer,
      drawStyle: (olFeature: OlFeature, resolution: number) => {
        const style = this.drawInteractionStyle;
        const buffer = this.buffer;
        if (buffer > 0) {
          style.getImage().setRadius(buffer / resolution);
        }
        return style;
      }
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
    control.setOlMap(this.map.ol);
  }

  /**
   * Deactivate the active control
   */
  private deactivateControl() {
    if (this.activeControl !== undefined) {
      this.activeControl.setOlMap(undefined);
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
      dataProjection: 'EPSG:4326'
    });
    this.writeValue(value);
  }

  /**
   * Add a GeoJSON geometry to the overlay
   * @param geometry GeoJSON geometry
   */
  private addGeoJSONToOverlay(geometry: GeoJSONGeometry) {
    const olGeometry = this.olGeoJSON.readGeometry(geometry, {
      dataProjection: 'EPSG:4326',
      featureProjection: this.map.projection
    });
    const olFeature = new OlFeature({geometry: olGeometry});
    this.olOverlaySource.clear();
    this.olOverlaySource.addFeature(olFeature);
  }
}
