import { Subscription } from 'rxjs';

import OlFeature from 'ol/Feature';

import { getEntityId } from 'src/lib/entity';
import { FeatureMotion } from '../feature.enum';
import { Feature } from '../feature.interfaces';
import {
  featureToOl,
  moveToFeatures
} from '../feature.utils';

import { FeatureStrategy } from './strategy';

export class FeatureLoadStrategy extends FeatureStrategy {

  private features$$: Subscription;

  activate() {
    this.deactivate();
    this.features$$ = this.store.filteredObservable
      .subscribe((features: Feature[]) => this.onFeaturesChange(features));
  }

  deactivate() {
    if (this.features$$ === undefined) {
      return;
    }
    this.features$$.unsubscribe();
  }

  private onFeaturesChange(features: Feature[]) {
    if (features.length === 0) {
      this.source.ol.clear();
    }
    this.setFeatures(features);
  }

  private setFeatures(features: Feature[], motion: FeatureMotion = FeatureMotion.Default) {
    const entitiesIds = features.map(getEntityId);
    const olFeaturesToRemove = [];

    this.source.ol.forEachFeature((olFeature: OlFeature) => {
      const entityId = olFeature.getId();
      const indexOfEntity = entitiesIds.indexOf(entityId);
      if (indexOfEntity < 0) {
        olFeaturesToRemove.push(olFeature);
      } else {
        entitiesIds.splice(indexOfEntity, 1);
      }
    });

    const featuresToAdd = features.filter((feature: Feature) => {
      return entitiesIds.indexOf(getEntityId(feature)) >= 0;
    });

    if (olFeaturesToRemove.length > 0) {
      this.removeOlFeatures(olFeaturesToRemove);
    }
    if (featuresToAdd.length > 0) {
      this.addFeatures(featuresToAdd, motion);
    }
  }

  private addFeatures(features: Feature[], motion: FeatureMotion = FeatureMotion.Default) {
    const olFeatures = [];
    features.map((feature: Feature) => {
      const olFeature = featureToOl(feature, this.map.projection);
      const olGeometry = olFeature.getGeometry();
      if (olGeometry === null) {
        return;
      }
      olFeatures.push(olFeature);
    });

    this.addOlFeatures(olFeatures, motion);
  }

  private addOlFeatures(olFeatures: OlFeature[], motion: FeatureMotion) {
    this.source.ol.addFeatures(olFeatures);
    moveToFeatures(this.map, olFeatures, motion);
  }

  private removeOlFeatures(olFeatures: OlFeature[]) {
    olFeatures.forEach((olFeature: OlFeature) => this.source.ol.removeFeature(olFeature));
  }
}
