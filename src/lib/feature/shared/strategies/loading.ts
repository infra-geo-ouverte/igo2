import { Subscription } from 'rxjs';

import { FeatureMotion } from '../feature.enum';
import { Feature } from '../feature.interfaces';
import { FeatureStore } from '../store';
import { FeatureStoreStrategy } from './strategy';

export class FeatureStoreLoadingStrategy extends FeatureStoreStrategy {

  private stores$$ = new Map<FeatureStore, Subscription>();

  bindStore(store: FeatureStore) {
    super.bindStore(store);
    if (this.isActive() === true) {
      this.watchStore(store);
    }
  }

  unbindStore(store: FeatureStore) {
    super.unbindStore(store);
    if (this.isActive() === true) {
      this.unwatchStore(store);
    }
  }

  protected doActivate() {
    this.stores.forEach((store: FeatureStore) => this.watchStore(store));
  }

  protected doDeactivate() {
    this.unwatchAll();
  }

  private watchStore(store: FeatureStore) {
    if (this.stores$$.has(store)) {
      return;
    }

    const subscription = store.filteredObservable
      .subscribe((features: Feature[]) => this.onFeaturesChange(features, store));
    this.stores$$.set(store, subscription);
  }

  private unwatchStore(store: FeatureStore) {
    const subscription = this.stores$$.get(store);
    if (subscription !== undefined) {
      subscription.unsubscribe();
      this.stores$$.delete(store);
    }
  }

  private unwatchAll() {
    Array.from(this.stores$$.entries()).forEach((entries: [FeatureStore, Subscription]) => {
      entries[1].unsubscribe();
    });
    this.stores$$.clear();
  }

  private onFeaturesChange(features: Feature[], store: FeatureStore) {
    if (features.length === 0) {
      store.clearLayer();
    } else {
      store.setLayerFeatures(features, FeatureMotion.Default);
    }
  }
}
