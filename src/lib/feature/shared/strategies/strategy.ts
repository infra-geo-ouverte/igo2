import { FeatureStore } from '../store';

export class FeatureStoreStrategy {

  protected stores: FeatureStore[] = [];
  protected active = false;

  isActive(): boolean {
    return this.active;
  }

  activate() {
    if (this.active === true) {
      this.doDeactivate();
    }
    this.active = true;
    this.doActivate();
  }

  deactivate() {
    this.active = false;
    this.doDeactivate();
  }

  bindStore(store: FeatureStore) {
    if (this.stores.indexOf(store) < 0) {
      this.stores.push(store);
    }
  }

  unbindStore(store: FeatureStore) {
    const index = this.stores.indexOf(store);
    if (index >= 0) {
      this.stores.splice(index, 1);
    }
  }

  protected doActivate() {}

  protected doDeactivate() {}

}
