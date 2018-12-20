import OlFeature from 'ol/Feature';

import { ListenerFunction } from 'ol/events';

import { Subscription, combineLatest } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import { State } from 'src/lib/entity';
import { IgoMap } from 'src/lib/map';

import { Feature, FeatureStoreSelectionStrategyOptions } from '../feature.interfaces';
import { FeatureStore } from '../store';
import { FeatureStoreStrategy } from './strategy';

export class FeatureStoreSelectionStrategy extends FeatureStoreStrategy {

  private map: IgoMap;
  private mapClickListener: ListenerFunction;
  private overlayStore: FeatureStore;
  private stores$$: Subscription;

  constructor(private options?: FeatureStoreSelectionStrategyOptions) {
    super();
    this.overlayStore = this.createOverlayStore();
    this.map = options.map;
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
    this.addOverlayLayer();
    this.listenToMapClick();
    this.watchAll();
  }

  protected doDeactivate() {
    this.unlistenToMapClick();
    this.unwatchAll();
    this.removeOverlayLayer();
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
          const storeOlLayer = this.stores.find((store: FeatureStore) => {
            return store.layer.ol === olLayer;
          });
          return storeOlLayer !== undefined;
        }
      });
      this.onSelectFromMap(olFeatures);
    });
  }

  private unlistenToMapClick() {
    if (this.mapClickListener !== undefined) {
      this.map.ol.un(
        this.mapClickListener.type,
        this.mapClickListener.listener
      );
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
        this.unselectAllFeaturesFromStore(store);
      } else {
        this.selectFeaturesFromStore(store, features);
      }
    });
  }

  private selectFeaturesFromStore(store: FeatureStore, features: Feature[]) {
    store.updateEntitiesState(features, {selected: true}, true);
  }

  private unselectAllFeaturesFromStore(store: FeatureStore) {
    store.updateAllEntitiesState({selected: false});
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

  private addOverlayLayer() {
    this.map.addLayer(this.overlayStore.layer, false);
  }

  private removeOverlayLayer() {
    this.overlayStore.source.ol.clear();
    // Remove directly from the olMap because, for some reason,
    // removing from the IgoMap doesn't remove the layer
    this.map.ol.removeLayer(this.overlayStore.layer.ol);
  }
}
