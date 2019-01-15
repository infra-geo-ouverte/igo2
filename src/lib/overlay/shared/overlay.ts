import OlFeature from 'ol/Feature';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import {
  Feature,
  FeatureMotion,
  featureToOl,
  moveToFeatures
} from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';

import { createOverlayLayer } from './overlay.utils';

/**
 * This class is simply a shortcut for adding features to a map.
 * It does nothing more than a standard layer but it's shipped with
 * a defautl style based on the geometry type of the features it contains.
 * @todo Enhance that by using a FeatureStore and strategies.
 */
export class Overlay {

  /**
   * The map to add the layer to
   */
  private map: IgoMap;

  /**
   * Overlay layer
   */
  private layer: VectorLayer;

  /**
   * Overlay layer's data source
   */
  get dataSource(): FeatureDataSource {
    return this.layer.dataSource as FeatureDataSource;
  }

  constructor(map?: IgoMap) {
    this.layer = createOverlayLayer();
    if (map !== undefined) {
      this.bind(map);
    }
  }

  /**
   * Bind this to a map and add the overlay layer to that map
   * @param map Map
   */
  bind(map: IgoMap) {
    this.map = map;
    this.map.addLayer(this.layer, false);
  }

  /**
   * Set the overlay features and, optionally, move to them
   * @param features Features
   * @param motion Optional: Apply this motion to the map view
   */
  setFeatures(features: Feature[], motion: FeatureMotion = FeatureMotion.Default) {
    this.clear();
    this.addFeatures(features, motion);
  }

  /**
   * Add a feature to the  overlay and, optionally, move to it
   * @param features Features
   * @param motion Optional: Apply this motion to the map view
   */
  addFeature(feature: Feature, motion: FeatureMotion = FeatureMotion.Default) {
    this.addFeatures([feature], motion);
  }

  /**
   * Add features to the  overlay and, optionally, move to them
   * @param features Features
   * @param motion Optional: Apply this motion to the map view
   */
  addFeatures(features: Feature[], motion: FeatureMotion = FeatureMotion.Default) {
    const olFeatures = [];
    features.map((feature: Feature) => {
      const olFeature = featureToOl(feature, this.map.projection);
      const olGeometry = olFeature.getGeometry();
      if (olGeometry === null) {
        return;
      }
      olFeatures.push(olFeature);
    });

    this.dataSource.ol.addFeatures(olFeatures);
    moveToFeatures(this.map, olFeatures, motion);
  }

  /**
   * Clear the overlay
   */
  clear() {
    this.dataSource.ol.clear();
  }

}
