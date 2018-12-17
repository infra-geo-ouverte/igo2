import { Subscription } from 'rxjs';

import {
  FeatureMotion,
  Feature
} from 'src/lib/feature';

import { LayerStore } from '../layer-store';
import { LayerStoreStrategy } from './strategy';

export class LayerStoreLoadStrategy implements LayerStoreStrategy {

  private stores$$ = new Map<LayerStore, Subscription>();

  constructor(private layerStores: LayerStore[]) {}

  activate() {
    this.deactivate();
    this.layerStores.forEach((layerStore: LayerStore) => {
      const subscription = layerStore.store.filteredObservable
        .subscribe((features: Feature[]) => this.onFeaturesChange(features, layerStore));
      this.stores$$.set(layerStore, subscription);
    });
  }

  deactivate() {
    Array.from(this.stores$$.entries()).forEach((entries: [LayerStore, Subscription]) => {
      entries[1].unsubscribe();
    });
    this.stores$$.clear();
  }

  private onFeaturesChange(features: Feature[], layerStore: LayerStore) {
    if (features.length === 0) {
      layerStore.clearLayer();
    } else {
      console.log(features)
      layerStore.setLayerFeatures(features, FeatureMotion.Default);
    }
  }
}
