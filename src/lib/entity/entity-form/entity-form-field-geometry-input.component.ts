import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
  HostBinding,
  Optional,
  Self,
  ElementRef
} from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';

import { Subject } from 'rxjs';

import OlWKT from 'ol/format/WKT';
import OlGeometry from 'ol/geom/Geometry';
import OlGeometryType from 'ol/geom/GeometryType';
import OlFeature from 'ol/Feature';
import OlDraw from 'ol/interaction/Draw';
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
  }]
})
export class EntityFormFieldGeometryInputComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

  static nextId = 0;

  public focused = false;
  public errorState = false;
  public controlType = 'geometry-input';
  public stateChanges = new Subject<void>();
  public onChange: any = () => {};
  public onTouched: any = () => {};

  private olWKT = new OlWKT();
  private olDrawLayer: OlVectorLayer;
  private olDrawInteraction: OlDraw;
  private onDrawStartKey: string;
  private onDrawEndKey: string;

  @Input()
  get value(): OlGeometry {
    return this._value;
  }
  set value(value: OlGeometry) {
    if (value !== this._value) {
      const feature = new OlFeature({geometry: value});
      this.olDrawSource.clear();
      this.olDrawSource.addFeature(feature);

      this._value = value;
      this.onChange(this._value);
    }
  }
  private _value: OlGeometry;

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
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(value) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required() {
    return this._required;
  }
  set required(value) {
    this._required = value
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this.stateChanges.next();
  }
  private _disabled = false;

  @HostBinding()
  id = `geometry-input-${EntityFormFieldGeometryInputComponent.nextId++}`;

  @HostBinding('attr.aria-describedby')
  describedBy = '';

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return !this.empty;
  }

  get olDrawSource(): OlVectorSource {
    return this.olDrawLayer.getSource();
  }

  get representation(): string {
    if (this.value !== undefined) {
      return this.olWKT.writeGeometry(this.value).substr(0, 30) + '...';
    }
    return '';
  }

  get empty() {
    return this.value === undefined;
  }

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl !== undefined) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.addOlDrawLayer();
    this.olDrawInteraction = this.createOlDrawInteraction();
  }

  ngAfterViewInit() {
    this.activateOlDrawInteraction();
  }

  ngOnDestroy() {
    this.map.ol.removeLayer(this.olDrawLayer);
    unByKey(this.onDrawStartKey);
    unByKey(this.onDrawEndKey);
    this.map.ol.removeInteraction(this.olDrawInteraction);
    this.stateChanges.complete();
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  writeValue(value: OlGeometry) {
    if (value) {
      this.value = value;
    }
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {}

  private addOlDrawLayer(): OlVectorLayer {
    const olDrawLayer = new OlVectorLayer({
      source: new OlVectorSource(),
      zIndex: 500
    });
    this.map.ol.addLayer(olDrawLayer);
    this.olDrawLayer = olDrawLayer;
  }

  private createOlDrawInteraction(): OlDraw {
    return new OlDraw({
      type: this.geometryType,
      source: this.olDrawSource
    });
  }

  private activateOlDrawInteraction() {
    this.onDrawStartKey = this.olDrawInteraction.on('drawstart', (event) => {
      this.onDrawStart(event);
    });
    this.onDrawEndKey = this.olDrawInteraction.on('drawend', (event) => {
      this.onDrawEnd(event);
    });
    this.map.ol.addInteraction(this.olDrawInteraction);
  }

  private onDrawStart(event) {
    this.olDrawSource.clear();
  }

  private onDrawEnd(event) {
    this.value = event.feature.getGeometry();
  }
}
