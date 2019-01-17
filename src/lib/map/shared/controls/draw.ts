import OlMap from 'ol/Map';
import OlGeometry from 'ol/geom/Geometry';
import OlLineString from 'ol/geom/LineString';
import OlGeometryType from 'ol/geom/GeometryType';
import OlDraw from 'ol/interaction/Draw';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import { unByKey } from 'ol/Observable';

import { BehaviorSubject } from 'rxjs';

import { GeometryMeasures, measureGeometry } from 'src/lib/measure';

export interface DrawControlOptions {
  geometryType: OlGeometryType;
  source?: OlVectorSource;
  measure?: boolean;
}

/**
 * Control to draw geometries
 */
export class DrawControl {

  /**
   * Observable out the geometry
   */
  public geometry$: BehaviorSubject<OlGeometry> = new BehaviorSubject(undefined);

  /**
   * Observable out the live measures
   */
  public measures$: BehaviorSubject<GeometryMeasures> = new BehaviorSubject({});

  private olMap: OlMap;
  private olOverlaySource: OlVectorSource;
  private olOverlayLayer: OlVectorLayer;
  private olDrawInteraction: OlDraw;
  private onDrawStartKey: string;
  private onDrawEndKey: string;
  private onMeasureKey: string;

  /**
   * Geometry type
   */
  get geometryType(): OlGeometryType {
    return this.options.geometryType;
  }

  /**
   * Whether measuring is enabled
   */
  get measure(): boolean {
    return this.options.measure === undefined ? false : this.options.measure;
  }

  /**
   * Map projection
   */
  get projection(): string {
    return this.olMap.getView().projection;
  }

  constructor(private options: DrawControlOptions) {
    if (options.source === undefined) {
      this.olOverlaySource = new OlVectorSource();
    } else {
      this.olOverlaySource = options.source;
    }
  }

  /**
   * Add or remove this control to/from a map.
   * @param map OL Map
   */
  setMap(olMap: OlMap | undefined) {
    if (olMap === undefined) {
      this.removeOlOverlayLayer();
      this.removeOlDrawInteraction();
      this.olMap = olMap;
      return;
    }

    this.olMap = olMap;
    this.addOlOverlayLayer();
    this.addOlDrawInteraction();
  }

  /**
   * Add an overlay layer to the map
   */
  private addOlOverlayLayer(): OlVectorLayer {
    this.olOverlayLayer = new OlVectorLayer({
      source: this.olOverlaySource,
      zIndex: 500
    });

    this.olMap.addLayer(this.olOverlayLayer);
  }

  /**
   * Remove the overlay layer from the map
   */
  private removeOlOverlayLayer() {
    if (this.olMap !== undefined) {
      this.olMap.removeLayer(this.olOverlayLayer);
    }
  }

  /**
   * Add a draw interaction to the map an set up some listeners
   */
  private addOlDrawInteraction() {
    const olDrawInteraction = new OlDraw({
      type: this.geometryType,
      source: this.olOverlaySource,
      stopClick: true
    });

    this.onDrawStartKey = olDrawInteraction.on('drawstart', (event) => {
      this.onDrawStart(event);
    });
    this.onDrawEndKey = olDrawInteraction.on('drawend', (event) => {
      this.onDrawEnd(event);
    });
    this.olMap.addInteraction(olDrawInteraction);
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
    if (this.olMap !== undefined) {
      this.olMap.removeInteraction(this.olDrawInteraction);
    }
    this.olDrawInteraction = undefined;
  }

  /**
   * When drawing starts, clear the overlay and start measuring
   * @param event Draw start event
   */
  private onDrawStart(event) {
    this.olOverlaySource.clear();
    if (this.measure === true) {
      this.startMeasuring(event.feature.getGeometry());
    }
  }

  /**
   * When drawing ends, update the geometry observable and stop measuring
   * @param event Draw end event
   */
  private onDrawEnd(event) {
    const geometry = event.feature.getGeometry();
    this.geometry$.next(geometry);
    if (this.measure === true) {
      this.stopMeasuring();
    }
  }

  /**
   * Start measuring the geometry being drawn and update the measures observable
   * @param olGeometry OL geometry being drawn
   */
  private startMeasuring(olGeometry: OlGeometry) {
    this.onMeasureKey = olGeometry.on('change', (event) => {
      const measures = measureGeometry(event.target, this.projection);
      this.measures$.next(measures);
    });
  }

  /**
   * Stop measuring
   */
  private stopMeasuring() {
    if (this.onMeasureKey !== undefined) {
      unByKey(this.onMeasureKey);
    }
  }

}
