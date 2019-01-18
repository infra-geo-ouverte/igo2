import OlMap from 'ol/Map';
import OlFeature from 'ol/Feature';
import OlStyle from 'ol/style';
import OlOverlay from 'ol/Overlay';
import OlGeometryType from 'ol/geom/GeometryType';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlDraw from 'ol/interaction/Draw';
import {
  Geometry as OlGeometry,
  GeometryEvent as OlGeometryEvent
} from 'ol/geom/Geometry';
import { DrawEvent as OlDrawEvent } from 'ol/interaction/Draw';
import { unByKey } from 'ol/Observable';

import { BehaviorSubject, Subject } from 'rxjs';

import {
  GeometryMeasures,
  measureOlGeometry
} from 'src/lib/measure';

export interface DrawControlOptions {
  geometryType: OlGeometryType;
  measure?: boolean;
  source?: OlVectorSource;
  layer?: OlVectorLayer;
  layerStyle?: OlStyle | ((olfeature: OlFeature) => OlStyle);
  drawStyle?: OlStyle | ((olfeature: OlFeature) => OlStyle);
}

/**
 * Control to draw geometries
 */
export class DrawControl {

  /**
   * Draw start observable
   */
  public start$: Subject<OlGeometry> = new Subject();

  /**
   * Draw end observable
   */
  public end$: Subject<OlGeometry> = new Subject();

  /**
   * Observable of the live measures
   */
  public measures$: BehaviorSubject<GeometryMeasures> = new BehaviorSubject({
    area: undefined,
    length: undefined,
    lengths: []
  });

  private olMap: OlMap;
  private olOverlayLayer: OlVectorLayer;
  private olDrawInteraction: OlDraw;
  private onDrawStartKey: string;
  private onDrawEndKey: string;
  private onMeasureKey: string;

  /**
   * Measures
   */
  get measures(): GeometryMeasures {
    return this.measures$.value;
  }

  /**
   * Geometry type
   * @internal
   */
  get geometryType(): OlGeometryType {
    return this.options.geometryType;
  }

  /**
   * Whether measuring is enabled
   * @internal
   */
  get measure(): boolean {
    return this.options.measure === undefined ? false : this.options.measure;
  }

  /**
   * Map projection
   * @internal
   */
  get projection(): string {
    return this.olMap.getView().projection;
  }

  /**
   * OL overlay source
   * @internal
   */
  get olOverlaySource(): OlVectorSource {
    return this.olOverlayLayer.getSource();
  }

  constructor(private options: DrawControlOptions) {
    if (options.layer !== undefined) {
      this.olOverlayLayer = options.layer;
    } else {
      this.olOverlayLayer = this.createOlInnerOverlayLayer();
    }
  }

  /**
   * Add or remove this control to/from a map.
   * @param map OL Map
   */
  setMap(olMap: OlMap | undefined) {
    if (olMap === undefined) {
      this.clearOlInnerOverlaySource();
      this.removeOlInnerOverlayLayer();
      this.removeOlDrawInteraction();
      this.olMap = olMap;
      return;
    }

    this.olMap = olMap;
    this.addOlInnerOverlayLayer();
    this.addOlDrawInteraction();
  }

  /**
   * Return the overlay source
   */
  getSource(): OlVectorSource {
    return this.olOverlaySource;
  }

  /**
   * Create an overlay source if none is defined in the options
   */
  private createOlInnerOverlayLayer(): OlVectorLayer {
    return new OlVectorLayer({
      source: this.options.source ? this.options.source : new OlVectorSource(),
      style: this.options.layerStyle,
      zIndex: 500
    });
  }

  /**
   * Clear the overlay layer if it wasn't defined in the options
   */
  private removeOlInnerOverlayLayer() {
    if (this.options.layer === undefined && this.olMap !== undefined) {
      this.olMap.removeLayer(this.olOverlayLayer);
    }
  }

  /**
   * Add the overlay layer if it wasn't defined in the options
   */
  private addOlInnerOverlayLayer(): OlVectorLayer {
    if (this.options.layer === undefined) {
      this.olMap.addLayer(this.olOverlayLayer);
    }
  }

  /**
   * Clear the overlay source if it wasn't defined in the options
   */
  private clearOlInnerOverlaySource() {
    if (this.options.layer === undefined && this.options.source === undefined) {
      this.olOverlaySource.clear();
    }
  }

  /**
   * Add a draw interaction to the map an set up some listeners
   */
  private addOlDrawInteraction() {
    const olDrawInteraction = new OlDraw({
      type: this.geometryType,
      source: this.olOverlaySource,
      stopClick: true,
      style: this.options.drawStyle
    });

    this.onDrawStartKey = olDrawInteraction
      .on('drawstart', (event: OlDrawEvent) => this.onDrawStart(event));
    this.onDrawEndKey = olDrawInteraction
      .on('drawend', (event: OlDrawEvent) => this.onDrawEnd(event));
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
  private onDrawStart(event: OlDrawEvent) {
    const olGeometry = event.feature.getGeometry();
    this.start$.next(olGeometry);
    this.clearOlInnerOverlaySource();
    if (this.measure === true) {
      this.startMeasuring(olGeometry);
    }
  }

  /**
   * When drawing ends, update the geometry observable and stop measuring
   * @param event Draw end event
   */
  private onDrawEnd(event: OlDrawEvent) {
    const olGeometry = event.feature.getGeometry();
    if (this.measure === true) {
      this.stopMeasuring();
    }
    this.end$.next(olGeometry);
  }

  /**
   * Start measuring the geometry being drawn and update the measures observable
   * @param olGeometry OL geometry being drawn
   */
  private startMeasuring(olGeometry: OlGeometry) {
    this.onMeasureKey = olGeometry.on('change', (event: OlGeometryEvent) => {
      const measures = measureOlGeometry(event.target, this.projection);
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
