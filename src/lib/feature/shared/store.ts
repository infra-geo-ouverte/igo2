import OlFeature from 'ol/Feature';

import { Subject } from 'rxjs';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import { IgoMap } from 'src/lib/map';
import { EntityStore } from 'src/lib/entity';

import { FeatureMotion } from './feature.enum';
import { Feature } from './feature.interfaces';
import { featureToOl, moveToFeatures } from './feature.utils';
import { FeatureStoreStrategy } from './strategies/strategy';

export class FeatureStore<T extends Feature = Feature> extends EntityStore<T> {

  get strategies(): FeatureStoreStrategy[] {
    return this._strategies;
  }
  private _strategies: FeatureStoreStrategy[] = [];

  get layer(): VectorLayer {
    return this._layer;
  }
  private _layer: VectorLayer;

  get map(): IgoMap {
    return this.layer ? this.layer.map as IgoMap : undefined;
  }

  get source(): FeatureDataSource {
    return this.layer ? this.layer.dataSource as FeatureDataSource : undefined;
  }

  bindLayer(layer: VectorLayer): FeatureStore {
    this._layer = layer;
    return this;
  }

  addStrategy(strategy: FeatureStoreStrategy): FeatureStore {
    this.strategies.push(strategy);
    strategy.bindStore(this);
    return this;
  }

  removeStrategy(strategy: FeatureStoreStrategy): FeatureStore {
    const index = this.strategies.indexOf(strategy);
    if (index >= 0) {
      this.strategies.splice(index, 1);
      strategy.unbindStore(this);
    }
    return this;
  }

  setLayerFeatures(features: Feature[], motion: FeatureMotion = FeatureMotion.Default) {
    if (this.layer === undefined) {
      throw new Error('This FeatureStore is not bound to a layer.');
    }

    const olFeatures = features
      .map((feature: Feature) => featureToOl(feature, this.map.projection));
    this.setLayerOlFeatures(olFeatures);
  }

  clearLayer() {
    if (this.layer === undefined) {
      throw new Error('This FeatureStore is not bound to a layer.');
    }

    this.source.ol.clear();
  }

  private setLayerOlFeatures(olFeatures: OlFeature[], motion: FeatureMotion = FeatureMotion.Default) {
    const olFeaturesMap = new Map();
    olFeatures.forEach((olFeature: OlFeature) => {
      olFeaturesMap.set(olFeature.getId(), olFeature);
    });

    const olFeaturesToRemove = [];
    this.source.ol.forEachFeature((olFeature: OlFeature) => {
      const newOlFeature = olFeaturesMap.get(olFeature.getId());
      if (newOlFeature === undefined) {
        olFeaturesToRemove.push(olFeature);
      } else if (newOlFeature.get('entityRevision') !== olFeature.get('entityRevision')) {
        olFeaturesToRemove.push(olFeature);
      } else {
        olFeaturesMap.delete(newOlFeature.getId());
      }
    });

    const olFeaturesToAddIds = Array.from(olFeaturesMap.keys());
    const olFeaturesToAdd = olFeatures.filter((olFeature: OlFeature) => {
      return olFeaturesToAddIds.indexOf(olFeature.getId()) >= 0;
    });

    if (olFeaturesToRemove.length > 0) {
      this.removeOlFeaturesFromLayer(olFeaturesToRemove);
    }
    if (olFeaturesToAdd.length > 0) {
      this.addOlFeaturesToLayer(olFeaturesToAdd);
    }

    // Determine the move action to take
    if (olFeaturesToAdd.length > 0) {
      moveToFeatures(this.map, olFeaturesToAdd, motion);
    } else if (olFeaturesToRemove.length > 0) {
      // Do nothing
    } else if (olFeatures.length > 0) {
      moveToFeatures(this.map, olFeatures, motion);
    }
  }

  private addOlFeaturesToLayer(olFeatures: OlFeature[]) {
    olFeatures.forEach((olFeature: OlFeature) => {
      olFeature.set('featureStore', this);
    });
    this.source.ol.addFeatures(olFeatures);
  }

  private removeOlFeaturesFromLayer(olFeatures: OlFeature[]) {
    olFeatures.forEach((olFeature: OlFeature) => {
      this.source.ol.removeFeature(olFeature);
    });
  }

}
