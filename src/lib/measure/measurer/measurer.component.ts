import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import OlVectorSource from 'ol/source/Vector';
import OlLineString from 'ol/geom/LineString';
import OlPolygon from 'ol/geom/Polygon';
import OlFeature from 'ol/Feature';
import OlOverlay from 'ol/Overlay';

import { IgoMap } from 'src/lib/map';
import { DrawControl } from 'src/lib/map';
import {
  MeasureType,
  MeasureAreaUnit,
  MeasureLengthUnit,
  GeometryMeasures
} from '../shared/measure.interfaces';
import {
  measureOlGeometry,
  createMeasureInteractionStyle,
  createMeasureLayerStyle,
  updateOlTooltipsAtMidpoints,
  getOlTooltipsAtMidpoints
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
   * Active OL geometry
   */
  private activeOlGeometry: OlLineString | OlPolygon;

  /**
   * Active draw control
   * @internal
   */
  private activeDrawControl: DrawControl;

  /**
   * Subscription to draw start
   */
  private drawStart$: Subscription;

  /**
   * Subscription to draw end
   */
  private drawEnd$: Subscription;

  /**
   * Subscription to controls changes
   */
  private drawChanges$: Subscription;

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
   * The minimum length a segment must have to display a tooltip
   */
  @Input() minSegmentLength: number = 10;

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
      source: new OlVectorSource(),
      drawStyle: createMeasureInteractionStyle(),
      layerStyle: createMeasureLayerStyle()
    });
  }

  /**
   * Create a draw polygon control
   */
  private createDrawPolygonControl() {
    this.drawPolygonControl = new DrawControl({
      geometryType: 'Polygon',
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
      .subscribe((olGeometry: OlLineString | OlPolygon) => this.onDrawStart(olGeometry));
    this.drawEnd$ = drawControl.end$
      .subscribe((olGeometry: OlLineString | OlPolygon) => this.onDrawEnd(olGeometry));
    this.drawChanges$ = drawControl.changes$
      .subscribe((olGeometry: OlLineString | OlPolygon) => this.onDrawChanges(olGeometry));
    drawControl.setMap(this.map.ol);
    this.showTooltipsOfOlSource(drawControl.getSource());
  }

  /**
   * Deactivate the active draw control
   */
  private deactivateDrawControl() {
    if (this.activeDrawControl === undefined) {
      return;
    }

    this.drawStart$.unsubscribe();
    this.drawEnd$.unsubscribe();
    this.drawChanges$.unsubscribe();
    this.clearTooltipsOfOlSource(this.activeDrawControl.getSource());
    if (this.activeOlGeometry !== undefined) {
      this.clearTooltipsOfOlGeometry(this.activeOlGeometry);
    }
    this.activeDrawControl.setMap(undefined);
    this.activeDrawControl = undefined;
    this.activeOlGeometry = undefined;
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
   * Clear the draw source and track the geometry being drawn
   * @param olGeometry Ol linestring or polygon
   */
  private onDrawStart(olGeometry: OlLineString | OlPolygon) {
    const olDrawSource = this.activeDrawControl.getSource();
    this.clearTooltipsOfOlSource(olDrawSource);
    olDrawSource.clear();
    this.activeOlGeometry = olGeometry;
  }

  /**
   * Clear the draw source and track the geometry being draw
   * @param olGeometry Ol linestring or polygon
   */
  private onDrawEnd(olGeometry:  OlLineString | OlPolygon) {
    this.activeOlGeometry = undefined;
  }

  /**
   * Update measures observables and map tooltips
   * @param measures Measures
   */
  private onDrawChanges(olGeometry:  OlLineString | OlPolygon) {
    const projection = this.map.ol.getView().projection;
    const measures = measureOlGeometry(olGeometry, projection);
    this.updateMeasuresOfOlGeometry(olGeometry, measures);
    this.updateTooltipsOfOlGeometry(olGeometry, measures);
  }

  /**
   * Update measures observables
   * @param measures Measures
   */
  private updateMeasuresOfOlGeometry(olGeometry:  OlLineString | OlPolygon, measures: GeometryMeasures) {
    this.area$.next(measures.area);
    this.length$.next(measures.length);

    const lengths = measures.lengths;
    let lastLengthIndex = lengths.length - 1;
    if (this.activeMeasureType === MeasureType.Area) {
      lastLengthIndex = lastLengthIndex - 1;
    }

    const lastLength = lengths.length >= lastLengthIndex ? lengths[lastLengthIndex] : 0;
    if (lastLength !== 0) {
      this.lastLength$.next(lastLength);
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

  private updateTooltipsOfOlGeometry(olGeometry: OlLineString | OlPolygon, measures: GeometryMeasures) {
    const lengths = measures.lengths;
    const olTooltips = updateOlTooltipsAtMidpoints(olGeometry);
    if (lengths.length !== olTooltips.length) {
      return;
    }

    for (let i = 0; i < olTooltips.length; i++) {
      const length = lengths[i];
      const olTooltip = olTooltips[i];
      olTooltip.setProperties({length}, true);
      olTooltip.getElement().innerHTML = this.computeTooltipInnerHTML(olTooltip);
      if (this.shouldShowTooltip(olTooltip)) {
        this.map.ol.addOverlay(olTooltip);
      }
    }
  }

  /**
   * Clear the map tooltips
   */
  private clearTooltipsOfOlSource(olDrawSource: OlVectorSource) {
    olDrawSource.forEachFeature((olFeature: OlFeature) => {
      const olGeometry = olFeature.getGeometry();
      if (olGeometry !== undefined) {
        this.clearTooltipsOfOlGeometry(olFeature.getGeometry());
      }
    });
  }

  private clearTooltipsOfOlGeometry(olGeometry: OlLineString | OlPolygon) {
    const olTooltips = getOlTooltipsAtMidpoints(olGeometry);
    olTooltips.forEach((olTooltip: OlOverlay | undefined) => {
      if (olTooltip !== undefined && olTooltip.getMap() !== undefined) {
        this.map.ol.removeOverlay(olTooltip);
      }
    });
  }

  /**
   * Show the map tooltips
   */
  private showTooltipsOfOlSource(olDrawSource: OlVectorSource) {
    olDrawSource.forEachFeature((olFeature: OlFeature) => {
      const olTooltips = getOlTooltipsAtMidpoints(olFeature.getGeometry());
      olTooltips.forEach((olTooltip: OlOverlay | undefined) => {
        if (this.shouldShowTooltip(olTooltip)) {
          this.map.ol.addOverlay(olTooltip);
        }
      });
    });
  }

  /**
   * Compute a tooltip's content
   * @param length Segment length
   * @returns Inner HTML
   */
  private computeTooltipInnerHTML(olTooltip: OlOverlay): string {
    const properties = olTooltip.getProperties();
    const length = properties['length'];
    return `${length.toFixed(3)}`;
  }

  /**
   * Whether a tooltip should be showned based on the length
   * of the segment it is bound to.
   * @param olTooltip OL overlay
   * @returns True if the tooltip should be shown
   */
  private shouldShowTooltip(olTooltip: OlOverlay): boolean {
    const properties = olTooltip.getProperties();
    const length = properties['length'];
    const minSegmentLength = Math.max(this.minSegmentLength, 0);
    return olTooltip !== undefined && length > minSegmentLength;
  }

}
