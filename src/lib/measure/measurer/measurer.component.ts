import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import OlVectorSource from 'ol/source/Vector';

import { IgoMap } from 'src/lib/map';
import { DrawControl } from 'src/lib/map';
import {
  MeasureType,
  MeasureAreaUnit,
  MeasureLengthUnit,
  GeometryMeasures
} from '../shared/measure.interfaces';

/**
 * Tool to measure lengths and areas
 */
@Component({
  selector: 'fadq-measurer',
  templateUrl: './measurer.component.html',
  styleUrls: ['./measurer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurerComponent implements OnInit, OnDestroy {

  /**
   * Reference to the MeasureType enum
   * @internal
   */
  public measureType = MeasureType;

  /**
   * Reference to the AreaMeasureUnit enum
   * @internal
   */
  public measureAreaUnit = MeasureAreaUnit;

  /**
   * Reference to the LengthMeasureUnit enum
   * @internal
   */
  public measureLengthUnit = MeasureLengthUnit;

  /**
   * Observable of area
   * @internal
   */
  public area$: BehaviorSubject<number> = new BehaviorSubject(undefined);

  /**
   * Observable of length
   * @internal
   */
  public length$: BehaviorSubject<number> = new BehaviorSubject(undefined);

  /**
   * Observable of last length
   * @internal
   */
  public lastLength$: BehaviorSubject<number> = new BehaviorSubject(undefined);

  /**
   * Wheter one of the draw control is active
   * @internal
   */
  public drawControlIsActive: boolean = false;

  /**
   * Draw control source
   */
  private olDrawSource: OlVectorSource;

  /**
   * Draw line control
   */
  private drawLineControl: DrawControl;

  /**
   * Draw polygon control
   */
  private drawPolygonControl: DrawControl;

  /**
   * Subscription to draw line control measures
   */
  private lineMeasures$: Subscription;

  /**
   * Subscription to draw polygon control measures
   */
  private polygonMeasures$: Subscription;

  /**
   * The map to measure on
   */
  @Input() map: IgoMap;

  /**
   * Measure type
   * @internal
   */
  @Input()
  set activeMeasureType(value: MeasureType) {
    this._activeMeasureType = value;
    this.clearMeasures();
    this.activateDrawControl();
  }
  get activeMeasureType(): MeasureType { return this._activeMeasureType; }
  private _activeMeasureType: MeasureType = MeasureType.Length;

  constructor() {}

  /**
   * Add draw controls and activate one
   * @internal
   */
  ngOnInit() {
    this.olDrawSource = new OlVectorSource();
    this.createDrawLineControl();
    this.createDrawPolygonControl();
    this.activateDrawControl();
  }

  /**
   * Clear the overlay layer and any interaction added by this component.
   * @internal
   */
  ngOnDestroy() {
    this.removeDrawLineControl();
    this.removeDrawPolygonControl();
  }

  /**
   * Set the measure type
   * @internal
   */
  onMeasureTypeChange(measureType: MeasureType) {
    this.activeMeasureType = measureType;
  }

  /**
   * Clear measures and vector source
   * @internal
   */
  onToggleChange(toggle: boolean) {
    console.log(toggle);
    if (toggle === true) {
      this.activateDrawControl();
    } else {
      this.deactivateDrawControl();
    }
  }

  /**
   * Activate the right draw control based on the measure type
   */
  private activateDrawControl() {
    if (this.activeMeasureType === MeasureType.Length) {
      this.deactivateDrawPolygonControl();
      this.activateDrawLineControl();
    } else if (this.activeMeasureType === MeasureType.Area) {
      this.deactivateDrawLineControl();
      this.activateDrawPolygonControl();
    }
    this.drawControlIsActive = true;
  }

  /**
   * Deactivate the draw control
   */
  private deactivateDrawControl() {
    this.deactivateDrawLineControl();
    this.deactivateDrawPolygonControl();
    this.drawControlIsActive = false;
  }

  /**
   * Create a draw line control and subscribe to it's measures
   */
  private createDrawLineControl() {
    this.drawLineControl = new DrawControl({
      geometryType: 'LineString',
      source: this.olDrawSource,
      measure: true
    });
    this.lineMeasures$ = this.drawLineControl.measures$
      .subscribe((measures: GeometryMeasures) => {
        this.updateMeasures(measures);
      });
  }

  /**
   * Remove the draw line control from the map and unsubscribe to it's emasures
   */
  private removeDrawLineControl() {
    this.drawLineControl.setMap(undefined);
    this.lineMeasures$.unsubscribe();
    this.drawLineControl = undefined;
  }

  /**
   * Activate the draw line control
   */
  private activateDrawLineControl() {
    this.drawLineControl.setMap(this.map.ol);
  }

  /**
   * Deactivate the draw line control
   */
  private deactivateDrawLineControl() {
    this.drawLineControl.setMap(undefined);
  }

  /**
   * Create a draw poylgon control and subscribe to it's measures
   */
  private createDrawPolygonControl() {
    this.drawPolygonControl = new DrawControl({
      geometryType: 'Polygon',
      source: this.olDrawSource,
      measure: true
    });
    this.polygonMeasures$ = this.drawPolygonControl.measures$
      .subscribe((measures: GeometryMeasures) => {
        this.updateMeasures(measures);
      });
  }

  /**
   * Remove the draw polygon control from the map and unsubscribe to it's measures
   */
  private removeDrawPolygonControl() {
    this.drawPolygonControl.setMap(undefined);
    this.polygonMeasures$.unsubscribe();
    this.drawPolygonControl = undefined;
  }

  /**
   * Activate the draw polygon control
   */
  private activateDrawPolygonControl() {
    this.drawPolygonControl.setMap(this.map.ol);
  }

  /**
   * Deactivate the draw polygon control
   */
  private deactivateDrawPolygonControl() {
    this.drawPolygonControl.setMap(undefined);
  }

  /**
   * Update measures observables
   * @param measures Measures
   */
  private updateMeasures(measures: GeometryMeasures) {
    this.area$.next(measures.area);
    this.length$.next(measures.length);
    if (measures.lastLength !== 0) {
      this.lastLength$.next(measures.lastLength);
    }
  }

  /**
   * Clear the measures observables
   */
  private clearMeasures() {
    this.area$.next(undefined);
    this.length$.next(undefined);
    this.lastLength$.next(undefined);
  }

}
