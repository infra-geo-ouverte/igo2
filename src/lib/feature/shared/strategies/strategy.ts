import { FeatureStore } from '../store';

/**
 * Strategies or responsible of synchronizing a feature store and a layer.
 * A strategy can be shared among multiple stores. Sharing a strategy
 * is a good idea when multiple strategies would have on cancelling effect
 * on each other.
 *
 * At creation, strategy is inactive and needs to be manually activated.
 */
export class FeatureStoreStrategy {

  /**
   * Feature store
   * @internal
   */
  protected stores: FeatureStore[] = [];

  /**
   * Whether this strategy is active
   * @internal
   */
  protected active = false;

  /**
   * Whether this strategy is active
   */
  isActive(): boolean { return this.active; }

  /**
   * Activate the strategy. If it's already active, it'll be deactivated
   * and activated again.
   */
  activate() {
    if (this.active === true) {
      this.doDeactivate();
    }
    this.active = true;
    this.doActivate();
  }

  /**
   * Activate the strategy. If it's already active, it'll be deactivated
   * and activated again.
   */
  deactivate() {
    this.active = false;
    this.doDeactivate();
  }

  /**
   * Bind this strategy to a store
   * @param store Feature store
   */
  bindStore(store: FeatureStore) {
    if (this.stores.indexOf(store) < 0) {
      this.stores.push(store);
    }
  }

  /**
   * Unbind this strategy from store
   * @param store Feature store
   */
  unbindStore(store: FeatureStore) {
    const index = this.stores.indexOf(store);
    if (index >= 0) {
      this.stores.splice(index, 1);
    }
  }

  /**
   * Do the stataegy activation
   * @internal
   */
  protected doActivate() {}

  /**
   * Do the strategy deactivation
   * @internal
   */
  protected doDeactivate() {}

}
