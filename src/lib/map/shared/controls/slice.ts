import OlMap from 'ol/Map';
import OlFeature from 'ol/Feature';
import OlStyle from 'ol/style';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlGeometry from 'ol/geom/Geometry';
import OlLineString from 'ol/geom/LineString';

import { Subject, Subscription } from 'rxjs';

import { sliceOlGeometry } from 'src/lib/geometry';
import { DrawControl } from './draw';

export interface SliceControlOptions {
  source?: OlVectorSource;
  layer?: OlVectorLayer;
  layerStyle?: OlStyle | ((olfeature: OlFeature) => OlStyle);
  drawStyle?: OlStyle | ((olfeature: OlFeature) => OlStyle);
}

/**
 * Control to modify geometries
 */
export class SliceControl {

  /**
   * Slice end observable
   */
  public end$: Subject<OlGeometry[]> = new Subject();

  private olMap: OlMap;
  private olOverlayLayer: OlVectorLayer;

  /**
   * Draw line control
   */
  private drawLineControl: DrawControl;

  /**
   * Subscription to draw end
   */
  private drawLineEnd$$: Subscription;

  /**
   * OL overlay source
   * @internal
   */
  get olOverlaySource(): OlVectorSource {
    return this.olOverlayLayer.getSource();
  }

  constructor(private options: SliceControlOptions) {
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
  setOlMap(olMap: OlMap | undefined) {
    if (olMap === undefined) {
      this.clearOlInnerOverlaySource();
      this.removeOlInnerOverlayLayer();
      this.removeDrawLineControl();
      this.olMap = olMap;
      return;
    }

    this.olMap = olMap;
    this.addOlInnerOverlayLayer();
    this.addDrawLineControl();
  }

  /**
   * Return the overlay source
   */
  getSource(): OlVectorSource {
    return this.olOverlaySource;
  }

  /**
   * Add an OL geometry to the overlay for slicing
   * @param olGeometry Ol Geometry
   */
  setOlGeometry(olGeometry: OlGeometry) {
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
   * Create a draw line control and add it to the map
   */
  private addDrawLineControl() {
    this.drawLineControl = new DrawControl({
      geometryType: 'LineString',
      layer: this.olOverlayLayer,
      drawStyle: this.options.drawStyle
    });
    this.drawLineEnd$$ = this.drawLineControl.end$
      .subscribe((olGeometry: OlLineString) => this.onDrawLineEnd(olGeometry));
    this.drawLineControl.setOlMap(this.olMap);
  }

  /**
   * Remove draw line control
   */
  private removeDrawLineControl() {
    if (this.drawLineControl === undefined) {
      return;
    }

    this.drawLineEnd$$.unsubscribe();
    this.drawLineControl.getSource().clear();
    this.drawLineControl.setOlMap(undefined);
  }

  /**
   * Clear the draw source and track the geometry being draw
   * @param olGeometry Ol linestring or polygon
   */
  private onDrawLineEnd(olLine:  OlLineString) {
    const olFeatures = this.olOverlaySource.getFeatures();
    if (olFeatures.length === 0) {
      return;
    }

    const olGeometry = olFeatures[0].getGeometry();
    const olGeometries = sliceOlGeometry(olGeometry, olLine);
    this.end$.next(olGeometries);
  }
}
