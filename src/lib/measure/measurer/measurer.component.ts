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
import OlVectorSource from 'ol/source/Vector';
import { VectorSourceEvent as OlVectorSourceEvent } from 'ol/source/Vector';
import OlLineString from 'ol/geom/LineString';
import OlPolygon from 'ol/geom/Polygon';
import OlFeature from 'ol/Feature';
import OlOverlay from 'ol/Overlay';
import { unByKey } from 'ol/Observable';

import { EntityTableTemplate } from 'src/lib/entity';
import { EntityTableComponent } from 'src/lib/entity/entity-table/entity-table.component';
import {
  FEATURE,
  FeatureStore,
  FeatureStoreLoadingStrategy,
  FeatureStoreSelectionStrategy
} from 'src/lib/feature';
import { IgoMap, DrawControl } from 'src/lib/map';

import { Measure, FeatureWithMeasure } from '../shared/measure.interfaces';
import {
  MeasureType,
  MeasureAreaUnit,
  MeasureLengthUnit,
} from '../shared/measure.enum';
import {
  measureOlGeometry,
  createMeasureInteractionStyle,
  createMeasureLayerStyle,
  updateOlTooltipsAtMidpoints,
  updateOlTooltipAtCenter,
  getTooltipsOfOlGeometry,
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
   * Whether measure units should be automatically determined
   * @internal
   */
  public measureUnitsAuto: boolean = false;

  /**
   * Observable of area
   * @internal
   */
  public measure$: BehaviorSubject<Measure> = new BehaviorSubject({});

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
   * Feature added listener key
   */
  private onFeatureAddedKey: string;

  /**
   * Feature removed listener key
   */
  private onFeatureRemovedKey: string;

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
   * OL draw source
   */
  private olDrawSource = new OlVectorSource();

  /**
   * OL draw source
   */
  private showTooltips: boolean = true;

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
  set activeMeasureType(value: MeasureType) { this.setActiveMeasureType(value); }
  get activeMeasureType(): MeasureType { return this._activeMeasureType; }
  private _activeMeasureType: MeasureType = MeasureType.Length;

  /**
   * The minimum length a segment must have to display a tooltip.
   * It also applies to area tooltips.
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
    this.onToggleTooltips(this.showTooltips);
    this.updateTooltipsOfOlSource(this.store.source.ol);
  }

  /**
   * Clear the overlay layer and any interaction added by this component.
   * @internal
   */
  ngOnDestroy() {
    this.setActiveMeasureType(undefined);
    this.freezeStore();
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
  onToggleTooltips(toggle: boolean) {
    this.showTooltips = toggle;
    if (toggle === true) {
      this.showTooltipsOfOlSource(this.store.source.ol);
    } else {
      this.clearTooltipsOfOlSource(this.store.source.ol);
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
    this.updateTooltipsOfOlSource(this.store.source.ol);
    if (this.activeOlGeometry !== undefined) {
      this.updateTooltipsOfOlGeometry(this.activeOlGeometry);
    }
  }

  /**
   * Set the measure type
   * @internal
   */
  onAreaUnitChange(unit: MeasureAreaUnit) {
    this.activeAreaUnit = unit;
    this.table.refresh();
    this.updateTooltipsOfOlSource(this.store.source.ol);
    if (this.activeOlGeometry !== undefined) {
      this.updateTooltipsOfOlGeometry(this.activeOlGeometry);
    }
  }

  /**
   * Initialize the measure store and set up some listeners
   * @internal
   */
  private initStore() {
    const store = this.store;

    if (store.layer === undefined) {
      const layer = new VectorLayer({
        zIndex: 200,
        source: new FeatureDataSource(),
        style: createMeasureLayerStyle()
      });
      store.bindLayer(layer);
    }

    if (store.layer.map === undefined) {
      this.map.addLayer(store.layer);
    }

    if (store.getStrategyOfType(FeatureStoreLoadingStrategy) === undefined) {
      store.addStrategy(new FeatureStoreLoadingStrategy());
    }
    store.activateStrategyOfType(FeatureStoreLoadingStrategy);

    if (store.getStrategyOfType(FeatureStoreSelectionStrategy) === undefined) {
      store.addStrategy(new FeatureStoreSelectionStrategy({map: this.map}));
    }
    store.activateStrategyOfType(FeatureStoreSelectionStrategy);

    this.onFeatureAddedKey = store.source.ol.on('addfeature', (event: OlVectorSourceEvent) => {
      const feature = event.feature;
      const olGeometry = feature.getGeometry();
      this.updateMeasureOfOlGeometry(olGeometry, feature.get('measure'));
    });

    this.onFeatureRemovedKey = store.source.ol.on('removefeature', (event: OlVectorSourceEvent) => {
      const olGeometry = event.feature.getGeometry();
      this.clearTooltipsOfOlGeometry(olGeometry);
    });
  }

  /**
   * Freeze any store, meaning the layer is removed, strategies are deactivated
   * and some listener removed
   * @internal
   */
  private freezeStore() {
    const store = this.store;
    unByKey(this.onFeatureAddedKey);
    unByKey(this.onFeatureRemovedKey);
    this.clearTooltipsOfOlSource(store.source.ol);
    this.map.removeLayer(store.layer);
    store.deactivateStrategyOfType(FeatureStoreLoadingStrategy);
    store.deactivateStrategyOfType(FeatureStoreSelectionStrategy);
  }

  /**
   * Create a draw line control
   */
  private createDrawLineControl() {
    this.drawLineControl = new DrawControl({
      geometryType: 'LineString',
      source: this.olDrawSource,
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
      source: this.olDrawSource,
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
  }

  /**
   * Deactivate the active draw control
   */
  private deactivateDrawControl() {
    if (this.activeDrawControl === undefined) {
      return;
    }

    this.olDrawSource.clear();
    this.drawStart$.unsubscribe();
    this.drawEnd$.unsubscribe();
    this.drawChanges$.unsubscribe();
    this.clearTooltipsOfOlSource(this.olDrawSource);
    if (this.activeOlGeometry !== undefined) {
      this.clearTooltipsOfOlGeometry(this.activeOlGeometry);
    }
    this.activeDrawControl.setOlMap(undefined);
    this.activeDrawControl = undefined;
    this.activeOlGeometry = undefined;
  }

  private setActiveMeasureType(measureType: MeasureType) {
    this._activeMeasureType = measureType;
    this.clearMeasures();
    this.toggleDrawControl();
  }

  /**
   * Clear the draw source and track the geometry being drawn
   * @param olGeometry Ol linestring or polygon
   */
  private onDrawStart(olGeometry: OlLineString | OlPolygon) {
    this.activeOlGeometry = olGeometry;
  }

  /**
   * Clear the draw source and track the geometry being draw
   * @param olGeometry Ol linestring or polygon
   */
  private onDrawEnd(olGeometry:  OlLineString | OlPolygon) {
    this.activeOlGeometry = undefined;
    this.addFeatureToStore(olGeometry);
    this.clearTooltipsOfOlGeometry(olGeometry);
    this.olDrawSource.clear(true);
  }

  /**
   * Update measures observables and map tooltips
   * @param olGeometry Ol linestring or polygon
   */
  private onDrawChanges(olGeometry:  OlLineString | OlPolygon) {
    const projection = this.map.ol.getView().getProjection();
    const measure = measureOlGeometry(olGeometry, projection);
    this.updateMeasureOfOlGeometry(olGeometry, Object.assign({}, measure, {
      area: undefined  // We don't want to display an area tooltip while drawing.
    }));
    this.measure$.next(measure);
  }

  /**
   * Update measures observables
   * @param olGeometry Ol linestring or polygon
   * @param measure Measure
   */
  private updateMeasureOfOlGeometry(olGeometry:  OlLineString | OlPolygon, measure: Measure) {
    olGeometry.setProperties({_measure: measure}, true);
    this.updateTooltipsOfOlGeometry(olGeometry);
  }

  /**
   * Clear the measures observables
   */
  private clearMeasures() {
    this.measure$.next({});
  }

  /**
   * Add a feature with measures to the store. The loading stragegy of the store
   * will trigger and add the feature to the map.
   * @internal
   */
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
        measure: olGeometry.get('_measure')
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
  private updateTooltipsOfOlGeometry(olGeometry: OlLineString | OlPolygon) {
    const measure = olGeometry.get('_measure');
    const lengths = measure.lengths;
    const area = measure.area;

    const olMidpointsTooltips = updateOlTooltipsAtMidpoints(olGeometry);
    if (lengths.length === olMidpointsTooltips.length) {
      for (let i = 0; i < olMidpointsTooltips.length; i++) {
        this.updateOlTooltip(
          olMidpointsTooltips[i],
          metersToUnit(lengths[i],  this.activeLengthUnit),
          this.activeLengthUnit,
          MeasureType.Length
        );
      }
    } else {
      console.warn('Failed to update measure tooltips.');
    }

    if (area !== undefined) {
      this.updateOlTooltip(
        updateOlTooltipAtCenter(olGeometry),
        squareMetersToUnit(area,  this.activeAreaUnit),
        this.activeAreaUnit,
        MeasureType.Area
      );
    }
  }

  /**
   * Show the map tooltips of a geoemtry
   */
  private showTooltipsOfOlGeometry(olGeometry: OlLineString | OlPolygon) {
    getTooltipsOfOlGeometry(olGeometry).forEach((olTooltip: OlOverlay | undefined) => {
      if (this.shouldShowTooltip(olTooltip)) {
        this.map.ol.addOverlay(olTooltip);
      }
    });
  }

  /**
   * Clear the tooltips of an OL geometrys
   * @param olGeometry OL geometry with tooltips
   */
  private clearTooltipsOfOlGeometry(olGeometry: OlLineString | OlPolygon) {
    getTooltipsOfOlGeometry(olGeometry).forEach((olTooltip: OlOverlay | undefined) => {
      if (olTooltip !== undefined && olTooltip.getMap() !== undefined) {
        this.map.ol.removeOverlay(olTooltip);
      }
    });
  }

  /**
   * Show the map tooltips of all the geometries of a source
   */
  private updateTooltipsOfOlSource(olSource: OlVectorSource) {
    olSource.forEachFeature((olFeature: OlFeature) => {
      this.updateTooltipsOfOlGeometry(olFeature.getGeometry());
    });
  }

  /**
   * Show the map tooltips of all the geometries of a source
   */
  private showTooltipsOfOlSource(olSource: OlVectorSource) {
    olSource.forEachFeature((olFeature: OlFeature) => {
      this.showTooltipsOfOlGeometry(olFeature.getGeometry());
    });
  }

  /**
   * Clear the map tooltips
   * @param olDrawSource OL vector source
   */
  private clearTooltipsOfOlSource(olSource: OlVectorSource) {
    olSource.forEachFeature((olFeature: OlFeature) => {
      const olGeometry = olFeature.getGeometry();
      if (olGeometry !== undefined) {
        this.clearTooltipsOfOlGeometry(olFeature.getGeometry());
      }
    });
  }

  /**
   * Update an OL tooltip properties and inner HTML and add it to the map if possible
   * @param olTooltip OL tooltip
   * @param measure The measure valeu ti display
   * @param measureUnit Display tooltip measure in those units
   */
  private updateOlTooltip(
    olTooltip: OlOverlay,
    measure: number,
    unit: MeasureAreaUnit | MeasureLengthUnit,
    type: MeasureType
  ) {
    olTooltip.setProperties({_measure: measure, _unit: unit, _type: type}, true);
    olTooltip.getElement().innerHTML = this.computeTooltipInnerHTML(olTooltip);
    if (this.shouldShowTooltip(olTooltip)) {
      this.map.ol.addOverlay(olTooltip);
    }
  }

  /**
   * Compute a tooltip's content
   * @param olTooltip OL overlay
   * @returns Inner HTML
   */
  private computeTooltipInnerHTML(olTooltip: OlOverlay): string {
    const properties = olTooltip.getProperties();
    return formatMeasure(properties['_measure'], {
      decimal: 1,
      unit: properties['_unit'],
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
    if (this.showTooltips === false) {
      return false;
    }

    const properties = olTooltip.getProperties();
    if (properties['_unit'] === MeasureType.Length) {
      const measure = properties['_measure'];
      const minSegmentLength = metersToUnit(this.minSegmentLength, properties['_unit']) || 0;
      return measure >  Math.max(minSegmentLength, 0);
    }

    return true;
  }
}
