import OlMap from 'ol/Map';
import OlFeature from 'ol/Feature';
import OlStyle from 'ol/style';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlModify from 'ol/interaction/Modify';
import OlTranslate from 'ol/interaction/Translate';
import {
  Geometry as OlGeometry,
  GeometryEvent as OlGeometryEvent
} from 'ol/geom/Geometry';
import { ModifyEvent as OlModifyEvent } from 'ol/interaction/Modify';
import { TranslateEvent as OlTranslateEvent } from 'ol/interaction/Translate';
import { MapBrowserPointerEvent } from 'ol/MapBrowserPointerEvent';
import { unByKey } from 'ol/Observable';

import { BehaviorSubject, Subject } from 'rxjs';

import { GeometryMeasures, measureGeometry } from 'src/lib/measure';

export interface ModifyControlOptions {
  measure?: boolean;
  source?: OlVectorSource;
  layer?: OlVectorLayer;
  layerStyle?: OlStyle | ((olfeature: OlFeature) => OlStyle);
  drawStyle?: OlStyle | ((olfeature: OlFeature) => OlStyle);
}

/**
 * Control to modify geometries
 */
export class ModifyControl {

  /**
   * Modify start observable
   */
  public start$: Subject<OlGeometry> = new Subject();

  /**
   * Modify end observable
   */
  public end$: Subject<OlGeometry> = new Subject();

  /**
   * Observable of the live measures
   */
  public measures$: BehaviorSubject<GeometryMeasures> = new BehaviorSubject({});

  private olMap: OlMap;
  private olOverlayLayer: OlVectorLayer;
  private olModifyInteraction: OlModify;
  private onModifyStartKey: string;
  private onModifyEndKey: string;
  private olTranslateInteraction: OlTranslate;
  private onTranslateStartKey: string;
  private onTranslateEndKey: string;
  private onMeasureKey: string;

  /**
   * Measures
   */
  get measures(): GeometryMeasures {
    return this.measures$.value;
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

  constructor(private options: ModifyControlOptions) {
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
      this.removeOlModifyInteraction();
      this.removeOlTranslateInteraction();
      this.olMap = olMap;
      return;
    }

    this.olMap = olMap;
    this.addOlInnerOverlayLayer();
    this.addOlTranslateInteraction();
    this.addOlModifyInteraction();
  }

  /**
   * Return the overlay source
   */
  getSource(): OlVectorSource {
    return this.olOverlaySource;
  }

  /**
   * Add an OL geometry to the overlay and start modifying it
   * @param olGeometry Ol Geometry
   */
  setGeometry(olGeometry: OlGeometry) {
    const olFeature = new OlFeature({geometry: olGeometry});
    this.olOverlaySource.clear();
    this.olOverlaySource.addFeature(olFeature);
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
   * Add a modify interaction to the map an set up some listeners
   */
  private addOlModifyInteraction() {
    const olModifyInteraction = new OlModify({
      source: this.olOverlaySource,
      style: this.options.drawStyle
    });

    this.onModifyStartKey = olModifyInteraction
      .on('modifystart', (event: OlModifyEvent) => this.onModifyStart(event));
    this.onModifyEndKey = olModifyInteraction
      .on('modifyend', (event: OlModifyEvent) => this.onModifyEnd(event));
    this.olMap.addInteraction(olModifyInteraction);
    this.olModifyInteraction = olModifyInteraction;
  }

  /**
   * Remove the modify interaction
   */
  private removeOlModifyInteraction() {
    if (this.olModifyInteraction === undefined) {
      return;
    }

    unByKey(this.onModifyStartKey);
    unByKey(this.onModifyEndKey);
    if (this.olMap !== undefined) {
      this.olMap.removeInteraction(this.olModifyInteraction);
    }
    this.olModifyInteraction = undefined;
  }

  /**
   * When modifying starts, clear the overlay and start measuring
   * @param event Modify start event
   */
  private onModifyStart(event: OlModifyEvent) {
    const olGeometry = event.features.item(0).getGeometry();
    this.start$.next(olGeometry);
    if (this.measure === true) {
      this.startMeasuring(olGeometry);
    }
  }

  /**
   * When modifying ends, update the geometry observable and stop measuring
   * @param event Modify end event
   */
  private onModifyEnd(event: OlModifyEvent) {
    const olGeometry = event.features.item(0).getGeometry();
    this.end$.next(olGeometry);
    if (this.measure === true) {
      this.stopMeasuring();
    }
  }

  /**
   * Add a translate interaction to the map an set up some listeners
   */
  private addOlTranslateInteraction() {
    const olTranslateInteraction = new OlTranslate({
      layers: [this.olOverlayLayer],
      handleDownEvent: (event: MapBrowserPointerEvent) => {
        // TODO: First check if the pointer is inside the geometry by a certain
        // distance to avoid modify/translate mixup
        const couldTranslate = OlTranslate.prototype.handleDownEvent.call(
          olTranslateInteraction,
          event
        );
        return couldTranslate;
      }
    });

    this.onTranslateStartKey = olTranslateInteraction
      .on('translatestart', (event: OlTranslateEvent) => this.onTranslateStart(event));
    this.onTranslateEndKey = olTranslateInteraction
      .on('translateend', (event: OlTranslateEvent) => this.onTranslateEnd(event));
    this.olMap.addInteraction(olTranslateInteraction);
    this.olTranslateInteraction = olTranslateInteraction;
  }

  /**
   * Remove the translate interaction
   */
  private removeOlTranslateInteraction() {
    if (this.olTranslateInteraction === undefined) {
      return;
    }

    unByKey(this.onTranslateStartKey);
    unByKey(this.onTranslateEndKey);
    if (this.olMap !== undefined) {
      this.olMap.removeInteraction(this.olTranslateInteraction);
    }
    this.olTranslateInteraction = undefined;
  }

  /**
   * When translation starts, clear the overlay and start measuring
   * @param event Translate start event
   */
  private onTranslateStart(event: OlTranslateEvent) {
    const olGeometry = event.features.item(0).getGeometry();
    this.start$.next(olGeometry);
  }

  /**
   * When translation ends, update the geometry observable and stop measuring
   * @param event Translate end event
   */
  private onTranslateEnd(event: OlTranslateEvent) {
    const olGeometry = event.features.item(0).getGeometry();
    this.end$.next(olGeometry);
  }

  /**
   * Start measuring the geometry being modified and update the measures observable
   * @param olGeometry OL geometry being modified
   */
  private startMeasuring(olGeometry: OlGeometry) {
    this.onMeasureKey = olGeometry.on('change', (event: OlGeometryEvent) => {
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
