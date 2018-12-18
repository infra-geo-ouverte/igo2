import OlFeature from 'ol/Feature';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import {
  FeatureMotion,
  Feature,
  featureToOl,
  moveToFeatures
} from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';
import { EntityStore } from 'src/lib/entity';

export class LayerStore {

  get layer(): VectorLayer {
    return this._layer;
  }

  get store(): EntityStore<Feature> {
    return this._store;
  }

  get map(): IgoMap {
    return this.layer.map as IgoMap;
  }

  get source(): FeatureDataSource {
    return this.layer.dataSource as FeatureDataSource;
  }

  constructor(
    private _layer: VectorLayer,
    private _store: EntityStore<Feature>
  ) {}

  setLayerFeatures(features: Feature[], motion: FeatureMotion = FeatureMotion.Default) {
    const olFeatures = features.map((feature: Feature) => featureToOl(feature, this.map.projection));
    this.setLayerOlFeatures(olFeatures);
  }

  setLayerOlFeatures(olFeatures: Feature[], motion: FeatureMotion = FeatureMotion.Default) {
    const entitiesIds = olFeatures.map((olFeature: OlFeature) => olFeature.getId());
    const olFeaturesToRemove = [];

    this.source.ol.forEachFeature((olFeature: OlFeature) => {
      const indexOfEntity = entitiesIds.indexOf(olFeature.getId());
      if (indexOfEntity < 0) {
        olFeaturesToRemove.push(olFeature);
      } else {
        entitiesIds.splice(indexOfEntity, 1);
      }
    });

    const olFeaturesToAdd = olFeatures.filter((olFeature: OlFeature) => {
      return entitiesIds.indexOf(olFeature.getId()) >= 0;
    });

    if (olFeaturesToRemove.length > 0) {
      this.removeOlFeaturesFromLayer(olFeaturesToRemove);
    }
    if (olFeaturesToAdd.length > 0) {
      this.addOlFeaturesToLayer(olFeaturesToAdd);
    }
    if (olFeatures.length > 0) {
      moveToFeatures(this.map, olFeatures, motion);
    }
  }

  clearLayer() {
    this.source.ol.clear();
  }

  private addOlFeaturesToLayer(olFeatures: OlFeature[]) {
    olFeatures.forEach((olFeature: OlFeature) => {
      olFeature.set('layerStore', this);
    });
    this.source.ol.addFeatures(olFeatures);
  }

  private removeOlFeaturesFromLayer(olFeatures: OlFeature[]) {
    olFeatures.forEach((olFeature: OlFeature) => this.source.ol.removeFeature(olFeature));
  }

}
