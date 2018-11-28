import { Subscription } from 'rxjs';

import * as olextent from 'ol/extent';
import * as olproj from 'ol/proj';
import OlFeature from 'ol/Feature';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import { Feature, featureToOl } from 'src/app/modules/feature';
import { EntityStore } from 'src/app/modules/entity';
import { OverlayAction } from 'src/app/modules/overlay';
import { IgoMap } from 'src/app/modules/map';

export class EntityLoader {

  private features$$: Subscription;

  get map(): IgoMap {
    return this.layer.map as IgoMap;
  }

  get source(): FeatureDataSource {
    return this.layer.dataSource as FeatureDataSource;
  }

  constructor(
    private layer: VectorLayer,
    private store: EntityStore<Feature>
  ) {}

  activate() {
    this.deactivate();
    this.features$$ = this.store.observable
      .subscribe((features: Feature[]) => this.onFeaturesChange(features));
  }

  deactivate() {
    if (this.features$$ === undefined) {
      return;
    }
    this.features$$.unsubscribe();
  }

  private onFeaturesChange(features: Feature[]) {
    // TODO: don't set features everytime and make sure no action
    // are taken when the features are only sorted.
    this.setFeatures(features);
  }

  private setFeatures(features: Feature[], action: OverlayAction = OverlayAction.Default) {
    this.clear();
    if (features.length > 0) {
      this.addFeatures(features, action);
    }
  }

  private addFeature(feature: Feature, action: OverlayAction = OverlayAction.Default) {
    this.addFeatures([feature], action);
  }

  private addFeatures(features: Feature[], action: OverlayAction = OverlayAction.Default) {
    const olFeatures = [];
    features.map((feature: Feature) => {
      const olFeature = featureToOl(feature, this.map.projection);
      const olGeometry = olFeature.getGeometry();
      if (olGeometry === null) {
        return;
      }
      olFeatures.push(olFeature);
    });

    this.addOlFeatures(olFeatures, action);
  }

  private clear() {
    this.source.ol.clear();
  }

  private addOlFeatures(olFeatures: OlFeature[], action: OverlayAction) {
    this.source.ol.addFeatures(olFeatures);

    const extent = this.computeOlFeaturesExtent(olFeatures);
    if (action === OverlayAction.Zoom) {
      this.map.zoomToExtent(extent);
    } else if (action === OverlayAction.Move) {
      this.map.moveToExtent(extent);
    } else if (action === OverlayAction.Default) {
      if (this.featuresAreOutOfView(extent) || this.featuresAreTooDeepInView(extent)) {
        this.map.zoomToExtent(extent);
      }
    }
  }

  private computeOlFeaturesExtent(olFeatures: OlFeature[]): [number, number, number, number] {
    const extent = olextent.createEmpty();

    olFeatures.forEach((olFeature: OlFeature) => {
      const olGeometry = olFeature.getGeometry();
      const featureExtent = this.computeOlFeatureExtent(olFeature);
      if (olextent.isEmpty(featureExtent) && olGeometry !== null) {
        olextent.extend(featureExtent, olGeometry.getExtent());
      }
      olextent.extend(extent, featureExtent);
    });

    return extent;
  }

  private computeOlFeatureExtent(olFeature: OlFeature): [number, number, number, number] {
    let extent = olextent.createEmpty();

    const olFeatureExtent = olFeature.get('extent');
    const olFeatureProjection = olFeature.get('projection');
    if (olFeatureExtent !== undefined && olFeatureProjection !== undefined) {
      extent = olproj.transformExtent(
        olFeatureExtent,
        olFeatureProjection,
        this.map.projection
      );
    }

    return extent;
  }

  /**
   * Return true if features are out of view.
   *
   * If features are too close to the edge, they are considered out of view.
   * We define the edge as 5% of the extent height.
   */
  private featuresAreOutOfView(featuresExtent: [number, number, number, number]) {
    const mapExtent = this.map.getExtent();
    const mapExtentHeight = olextent.getHeight(mapExtent);
    const edgeRatio = 0.05;
    const viewExtent = olextent.buffer(mapExtent, mapExtentHeight * edgeRatio * -1);

    return !olextent.containsExtent(viewExtent, featuresExtent);
  }

  /**
   * Return true if features are too deep into the view. This results
   * in features being too small.
   *
   * Features are considered too small if their extent occupies less than
   * 1% of the map extent.
   */
  private featuresAreTooDeepInView(featuresExtent: [number, number, number, number]) {
    const mapExtent = this.map.getExtent();
    const mapExtentArea = olextent.getArea(mapExtent);
    const featuresExtentArea = olextent.getArea(featuresExtent);
    const areaRatio = 0.01;

    return (featuresExtentArea / mapExtentArea) < areaRatio;
  }
}
