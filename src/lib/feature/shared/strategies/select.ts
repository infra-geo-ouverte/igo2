import OlFeature from 'ol/Feature';

import { ListenerFunction } from 'ol/events';

import { Subscription, combineLatest } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import { State } from 'src/lib/entity';

import { Feature, FeatureStoreSelectStrategyOptions } from '../feature.interfaces';
import { FeatureStore } from '../store';
import { FeatureStoreStrategy } from './strategy';

export class FeatureStoreSelectStrategy extends FeatureStoreStrategy {

  private mapClickListener: ListenerFunction;
  private overlayStore: FeatureStore;
  private stores$$: Subscription;

  constructor(private options?: FeatureStoreSelectStrategyOptions) {
    super();
    this.overlayStore = this.createOverlayStore();
  }

  bindStore(store: FeatureStore) {
    super.bindStore(store);
    if (this.isActive() === true) {
      // Force reactivation
      this.activate();
    }
  }

  unbindStore(store: FeatureStore) {
    super.unbindStore(store);
    if (this.isActive() === true) {
      // Force reactivation
      this.activate();
    }
  }

  protected doActivate() {
    this.map.addLayer(this.overlayStore.layer, false);
    this.listenToMapClick();
    this.watchAll();
  }

  protected doDeactivate() {
    this.map.removeLayer(this.overlayStore.layer);
    this.unlistenToMapClick();
    this.unwatchAll();
  }

  private watchAll() {
    this.unwatchAll();

    const stores$ = this.stores.map((store: FeatureStore) => {
      return store.observeBy((feature: Feature, state: State) => {
        return state.selected === true;
      });
    });
    this.stores$$ = combineLatest(...stores$)
      .pipe(
        debounceTime(50),
        map((features: Array<Feature[]>) => features.reduce((a, b) => a.concat(b)))
      ).subscribe((features: Feature[]) => this.onSelectFromStore(features));
  }

  private unwatchAll() {
    if (this.stores$$ !== undefined) {
      this.stores$$.unsubscribe();
    }
  }

  private listenToMapClick() {
    this.mapClickListener = this.map.ol.on('singleclick', (event) => {
      const olFeatures = event.map.getFeaturesAtPixel(event.pixel, {
        layerFilter: (olLayer) => {
          const storeOlLayer = this.stores
            .find((store: FeatureStore) => store.layer.ol === olLayer);
          return storeOlLayer !== undefined;
        }
      });
      this.onSelectFromMap(olFeatures);
    });
  }

  private unlistenToMapClick() {
    if (this.mapClickListener !== undefined) {
      this.map.ol.un('singleclick', this.mapClickListener);
      this.mapClickListener = undefined;
    }
  }

  private onSelectFromStore(features: Feature[]) {
    const motion = this.options ? this.options.motion : undefined;
    this.overlayStore.setLayerFeatures(features, motion);
  }

  private onSelectFromMap(olFeatures?: OlFeature[]) {
    const groupedFeatures = this.groupFeaturesByStore(olFeatures);

    this.stores.forEach((store: FeatureStore) => {
      const features = groupedFeatures.get(store);
      if (features === undefined) {
        store.updateAllEntitiesState({selected: false});
      } else {
        store.updateEntitiesState(features, {selected: true}, true);
      }
    });
  }

  private groupFeaturesByStore(olFeatures: OlFeature[]): Map<FeatureStore, Feature[]> {
    const groupedFeatures = new Map<FeatureStore, Feature[]>();
    if (olFeatures === null || olFeatures === undefined) {
      return groupedFeatures;
    }

    olFeatures.forEach((olFeature: OlFeature) => {
      const store = olFeature.get('featureStore');

      let features = groupedFeatures.get(store);
      if (features === undefined) {
        features = [];
        groupedFeatures.set(store, features);
      }

      const feature = store.getEntityById(olFeature.getId());
      if (feature !== undefined) {
        features.push(feature);
      }
    });

    return groupedFeatures;
  }

  private createOverlayStore() {
    const overlayLayer = new VectorLayer({
      zIndex: 200,
      source: new FeatureDataSource(),
      style: this.options ? this.options.style : undefined
    });

    return new FeatureStore().bindLayer(overlayLayer);
  }
}
