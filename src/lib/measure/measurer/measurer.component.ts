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
import {
  createMeasureInteractionStyle,
  createMeasureLayerStyle
} from '../shared/measure.utils';

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
   * Draw line control
   */
  private drawLineControl: DrawControl;

  /**
   * Draw polygon control
   */
  private drawPolygonControl: DrawControl;

  /**
   * Active draw control
   * @internal
   */
  public activeDrawControl: DrawControl;

  /**
   * Subscription to controls measures
   */
  private measures$: Subscription;

  /**
   * Subscription to draw start
   */
  private drawStart$: Subscription;

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
    this.toggleDrawControl();
  }
  get activeMeasureType(): MeasureType { return this._activeMeasureType; }
  private _activeMeasureType: MeasureType = MeasureType.Length;

   /**
   * Wheter one of the draw control is active
   * @internal
   */
  get drawControlIsActive(): boolean {
    return this.activeDrawControl !== undefined;
  }

  constructor() {}

  /**
   * Add draw controls and activate one
   * @internal
   */
  ngOnInit() {
    this.createDrawLineControl();
    this.createDrawPolygonControl();
    this.toggleDrawControl();
  }

  /**
   * Clear the overlay layer and any interaction added by this component.
   * @internal
   */
  ngOnDestroy() {
    this.removeDrawControls();
  }

  /**
   * Set the measure type
   * @internal
   */
  onMeasureTypeChange(measureType: MeasureType) {
    this.activeMeasureType = measureType;
  }

  /**
   * Activate or deactivate the current draw control
   * @internal
   */
  onToggleChange(toggle: boolean) {
    if (toggle === true) {
      this.toggleDrawControl();
    } else {
      this.deactivateDrawControl();
    }
  }

  /**
   * Create a draw line control
   */
  private createDrawLineControl() {
    this.drawLineControl = new DrawControl({
      geometryType: 'LineString',
      measure: true,
      source: new OlVectorSource(),
      drawStyle: createMeasureInteractionStyle(),
      layerStyle: createMeasureLayerStyle()
    });
  }

  /**
   * Create a draw polygon control and subscribe to it's measures
   */
  private createDrawPolygonControl() {
    this.drawPolygonControl = new DrawControl({
      geometryType: 'Polygon',
      measure: true,
      source: new OlVectorSource(),
      drawStyle: createMeasureInteractionStyle(),
      layerStyle: createMeasureLayerStyle()
    });
  }

  /**
   * Activate the right control
   */
  private toggleDrawControl() {
    this.deactivateDrawControl();
    if (this.activeMeasureType === MeasureType.Length) {
      this.activateDrawControl(this.drawLineControl);
    } else if (this.activeMeasureType === MeasureType.Area) {
      this.activateDrawControl(this.drawPolygonControl);
    }
  }

  /**
   * Activate a given control
   * @param drawControl Draw control
   */
  private activateDrawControl(drawControl: DrawControl) {
    this.activeDrawControl = drawControl;
    this.drawStart$ = drawControl.start$
      .subscribe(() => drawControl.getSource().clear());
    this.measures$ = drawControl.measures$
      .subscribe((measures: GeometryMeasures) => this.setMeasures(measures));
    drawControl.setMap(this.map.ol);
  }

  /**
   * Deactivate the active draw control
   */
  private deactivateDrawControl() {
    if (this.activeDrawControl !== undefined) {
      this.activeDrawControl.setMap(undefined);
    }
    if (this.drawStart$ !== undefined) {
      this.drawStart$.unsubscribe();
    }
    if (this.measures$ !== undefined) {
      this.measures$.unsubscribe();
    }
    this.activeDrawControl = undefined;
  }

  /**
   * Remove draw controls
   */
  private removeDrawControls() {
    this.deactivateDrawControl();
    this.drawLineControl.getSource().clear();
    this.drawPolygonControl.getSource().clear();
  }

  /**
   * Update measures observables
   * @param measures Measures
   */
  private setMeasures(measures: GeometryMeasures) {
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
