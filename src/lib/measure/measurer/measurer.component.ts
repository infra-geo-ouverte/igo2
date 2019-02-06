import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { uuid } from '@igo2/utils';
import { VectorLayer, FeatureDataSource } from '@igo2/geo';

import OlStyle from 'ol/style/Style';
import OlGeoJSON from 'ol/format/GeoJSON';
import OlVectorLayer from 'ol/layer/Vector';
import OlVectorSource from 'ol/source/Vector';
import OlLineString from 'ol/geom/LineString';
import OlPolygon from 'ol/geom/Polygon';
import OlFeature from 'ol/Feature';
import OlOverlay from 'ol/Overlay';

import { EntityTableTemplate } from 'src/lib/entity';
import { EntityTableComponent } from 'src/lib/entity/entity-table/entity-table.component';
import { FEATURE, FeatureStore, FeatureStoreLoadingStrategy } from 'src/lib/feature';
import { IgoMap, DrawControl } from 'src/lib/map';

import { Measure, FeatureWithMeasure } from '../shared/measure.interfaces';
import {
  MeasureType,
  MeasureAreaUnit,
  MeasureLengthUnit,
  MeasureLengthUnitAbbreviation
} from '../shared/measure.enum';
import {
  measureOlGeometry,
  createMeasureInteractionStyle,
  createMeasureLayerStyle,
  updateOlTooltipsAtMidpoints,
  getOlTooltipsAtMidpoints,
  squareMetersToUnit,
  metersToUnit,
  formatMeasure
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
   * Table template
   * @internal
   */
  public tableTemplate: EntityTableTemplate = {
    selection: true,
    sort: true,
    columns: [
      {
        name: 'length',
        title: 'Length',
        valueAccessor: (feature: FeatureWithMeasure) => {
          const unit = this.activeLengthUnit;
          const measure = metersToUnit(feature.properties.measure.length, unit);
          return formatMeasure(measure, {
            decimal: 1,
            unit: unit,
            unitAbbr: false,
            locale: 'fr'
          });
        }
      },
      {
        name: 'area',
        title: 'Area',
        valueAccessor: (feature: FeatureWithMeasure) => {
          const unit = this.activeAreaUnit;
          const measure = squareMetersToUnit(feature.properties.measure.area, unit);
          return measure ? formatMeasure(measure, {
            decimal: 1,
            unit: unit,
            unitAbbr: false,
            locale: 'fr'
          }) : '';
        }
      }
    ]
  };

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
   * Whther measure units should be automatically determined
   * @internal
   */
  public measureUnitsAuto: boolean = true;

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
   * Observable of lengths
   * @internal
   */
  public lengths$: BehaviorSubject<number[]> = new BehaviorSubject([]);

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
   * Active mlength unit
   */
  private activeLengthUnit: MeasureLengthUnit = MeasureLengthUnit.Meters;

  /**
   * Active area unit
   */
  private activeAreaUnit: MeasureAreaUnit = MeasureAreaUnit.SquareMeters;

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
   * The measures store
   */
  @Input() store: FeatureStore<FeatureWithMeasure>;

  /**
   * Measure type
   * @internal
   */
  @Input()
  set activeMeasureType(value: MeasureType) {
    this._activeMeasureType = value;
    this.clearMeasures();
    this.toggleDrawControl();
    this.drawLineControl.getSource().clear();
    this.drawPolygonControl.getSource().clear();
  }
  get activeMeasureType(): MeasureType { return this._activeMeasureType; }
  private _activeMeasureType: MeasureType = MeasureType.Length;

  /**
   * The minimum length a segment must have to display a tooltip
   */
  @Input() minSegmentLength: number = 10;

  @ViewChild('table') table: EntityTableComponent;

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
    this.initStore();
    this.createDrawLineControl();
    this.createDrawPolygonControl();
    this.toggleDrawControl();
  }

  /**
   * Clear the overlay layer and any interaction added by this component.
   * @internal
   */
  ngOnDestroy() {
    this.drawLineControl.getSource().clear();
    this.drawPolygonControl.getSource().clear();
    this.deactivateDrawControl();
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
  onToggleDrawControl(toggle: boolean) {
    if (toggle === true) {
      this.toggleDrawControl();
    } else {
      this.deactivateDrawControl();
    }
  }

  /**
   * Activate or deactivate the current draw control
   * @internal
   */
  onToggleMapTooltips(toggle: boolean) {
    if (toggle === true) {
      this.showTooltipsOfOlSource(this.drawLineControl.getSource());
      this.showTooltipsOfOlSource(this.drawPolygonControl.getSource());
    } else {
      this.clearTooltipsOfOlSource(this.drawLineControl.getSource());
      this.clearTooltipsOfOlSource(this.drawPolygonControl.getSource());
    }
  }

  /**
   * Activate or deactivate the current draw control
   * @internal
   */
  onToggleMeasureUnitsAuto(toggle: boolean) {
    this.measureUnitsAuto = toggle;
  }

  /**
   * Set the measure type
   * @internal
   */
  onLengthUnitChange(unit: MeasureLengthUnit) {
    this.activeLengthUnit = unit;
    this.table.refresh();
    if (this.activeOlGeometry !== undefined) {
      this.updateTooltipsOfOlGeometry(this.activeOlGeometry, this.lengths$.value);
    }
  }

  /**
   * Set the measure type
   * @internal
   */
  onAreaUnitChange(unit: MeasureAreaUnit) {
    this.activeAreaUnit = unit;
    this.table.refresh();
  }

  private initStore() {
    if (this.store.layer === undefined) {
      const layer = new VectorLayer({
        zIndex: 200,
        source: new FeatureDataSource(),
        style: createMeasureLayerStyle()
      });
      this.map.addLayer(layer);
      this.store.bindLayer(layer);
    }

    if (this.store.getStrategyOfType(FeatureStoreLoadingStrategy) === undefined) {
      const strategy = new FeatureStoreLoadingStrategy();
      this.store.addStrategy(strategy);
      strategy.activate();
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
      layerStyle: new OlStyle({})
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
      layerStyle: new OlStyle({})
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
    drawControl.setOlMap(this.map.ol);
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
    this.activeDrawControl.setOlMap(undefined);
    this.activeDrawControl = undefined;
    this.activeOlGeometry = undefined;
  }

  /**
   * Clear the draw source and track the geometry being drawn
   * @param olGeometry Ol linestring or polygon
   */
  private onDrawStart(olGeometry: OlLineString | OlPolygon) {
    // const olDrawSource = this.activeDrawControl.getSource();
    // this.clearTooltipsOfOlSource(olDrawSource);
    // olDrawSource.clear();
    this.activeOlGeometry = olGeometry;
  }

  /**
   * Clear the draw source and track the geometry being draw
   * @param olGeometry Ol linestring or polygon
   */
  private onDrawEnd(olGeometry:  OlLineString | OlPolygon) {
    const olDrawSource = this.activeDrawControl.getSource();
    this.clearTooltipsOfOlSource(olDrawSource);
    olDrawSource.clear();
    this.activeOlGeometry = undefined;
    this.addFeatureToStore(olGeometry);
  }

  /**
   * Update measures observables and map tooltips
   * @param olGeometry Ol linestring or polygon
   */
  private onDrawChanges(olGeometry:  OlLineString | OlPolygon) {
    const projection = this.map.ol.getView().getProjection();
    const measure = measureOlGeometry(olGeometry, projection);
    this.updateMeasureOfOlGeometry(olGeometry, measure);
    this.updateTooltipsOfOlGeometry(olGeometry, measure.lengths);
  }

  /**
   * Update measures observables
   * @param olGeometry Ol linestring or polygon
   * @param measure Measure
   */
  private updateMeasureOfOlGeometry(olGeometry:  OlLineString | OlPolygon, measure: Measure) {
    this.area$.next(measure.area);
    this.length$.next(measure.length);
    this.lengths$.next(measure.lengths);
  }

  /**
   * Clear the measures observables
   */
  private clearMeasures() {
    this.area$.next(undefined);
    this.length$.next(undefined);
  }

  private addFeatureToStore(olGeometry:  OlLineString | OlPolygon) {
    const projection = this.map.ol.getView().getProjection();
    const geometry = new OlGeoJSON().writeGeometryObject(olGeometry, {
      featureProjection: projection,
      dataProjection: projection
    });
    const feature = {
      type: FEATURE,
      geometry: geometry,
      projection: projection.getCode(),
      properties: {
        measure: measureOlGeometry(olGeometry, projection)
      },
      meta: {
        id: uuid()
      }
    };
    this.store.addEntities([feature]);
  }

  /**
   * Update all the tooltips of an OL geometry
   * @param olGeometry OL Geometry
   * @param lengths Lengths of the OL geometry's segments
   * @param measureUnit Display tooltip measure in those units
   */
  private updateTooltipsOfOlGeometry(
    olGeometry: OlLineString | OlPolygon,
    lengths: number[]
  ) {
    const olTooltips = updateOlTooltipsAtMidpoints(olGeometry);
    if (lengths.length !== olTooltips.length) {
      return;
    }

    for (let i = 0; i < olTooltips.length; i++) {
      const length = lengths[i];
      const olTooltip = olTooltips[i];
      this.updateOlTooltip(olTooltip, length, this.activeLengthUnit);
    }
  }

  /**
   * Update an OL tooltip properties and inner HTML and add it to the map if possible
   * @param olTooltip OL tooltip
   * @param length Length of the tooltip's segment in meters
   * @param measureUnit Display tooltip measure in those units
   */
  private updateOlTooltip(
    olTooltip: OlOverlay,
    length: number,
    measureUnit: MeasureLengthUnit
  ) {
    const properties = {length, measureUnit};
    olTooltip.setProperties(properties, true);
    olTooltip.getElement().innerHTML = this.computeTooltipInnerHTML(olTooltip);
    if (this.shouldShowTooltip(olTooltip)) {
      this.map.ol.addOverlay(olTooltip);
    }
  }

  /**
   * Clear the map tooltips
   * @param olDrawSource OL vector source
   */
  private clearTooltipsOfOlSource(olDrawSource: OlVectorSource) {
    olDrawSource.forEachFeature((olFeature: OlFeature) => {
      const olGeometry = olFeature.getGeometry();
      if (olGeometry !== undefined) {
        this.clearTooltipsOfOlGeometry(olFeature.getGeometry());
      }
    });
  }

  /**
   * Clear the tooltips of an OL geometrys
   * @param olGeometry OL geometry with tooltips
   */
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
    const measureUnit = properties['measureUnit'] || MeasureLengthUnit.Meters;
    const converted = metersToUnit(length, measureUnit);
    return formatMeasure(converted, {
      decimal: 1,
      unit: measureUnit,
      unitAbbr: true,
      locale: 'fr'
    });
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
