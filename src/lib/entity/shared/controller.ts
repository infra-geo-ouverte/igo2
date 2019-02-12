import { ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { objectsAreEquivalent } from '../../utils/object';
import { EntityKey } from './entity.interfaces';

import { EntityStore } from './store';

/**
 * This class is used to synchronize a component's changes
 * detection with an EntityStore changes. For example, it is frequent
 * to have a component subscribe to a store's selected entity and, at the same time,
 * this component provides a way to select an entity with, let's say, a click.
 *
 * This class automatically handles those case and triggers the compoent's
 * change detection when needed.
 *
 * Note: If the component observes the store's stateView, a controller is
 * probably not required because the stateView catches any changes to the
 * entities and their state.
 */
export class EntityStoreController<E extends object> {

  /**
   * Component change detector
   */
  private cdRef: ChangeDetectorRef;

  /**
   * Entity store
   */
  private store: EntityStore<E>;

  /**
   * Component inner state
   */
  private innerStateIndex = new Map<EntityKey, {[key: string]: any}>();

  /**
   * Subscription to the store's entities
   */
  private entities$$: Subscription;

  /**
   * Subscription to the store's state
   */
  private state$$: Subscription;

  constructor(store?: EntityStore<E>, cdRef?: ChangeDetectorRef) {
    this.setChangeDetector(cdRef);
    this.setStore(store);
  }

  destroy() {
    this.setChangeDetector(undefined);
    this.setStore(undefined);
  }

  /**
   * Bind this controller to a store and start watching for changes
   * @param store Entity store
   */
  setStore(store?: EntityStore<E>) {
    if (store === undefined) {
      this.teardownObservers();
      this.innerStateIndex.clear();
      this.store = undefined;
      return;
    }

    this.setStore(undefined);
    this.store = store;
    this.setupObservers();
    this.detectChanges();
  }

  /**
   * Bind this controller to a component's change detector
   * @param cdRef Change detector
   */
  setChangeDetector(cdRef?: ChangeDetectorRef) {
    this.cdRef = cdRef;
  }

  /**
   * Set up observers on a store's entities and their state
   * @param store Entity store
   */
  private setupObservers() {
    this.teardownObservers();

    this.entities$$ = this.store.entities$
      .subscribe((entities: E[]) => this.onEntitiesChange(entities));

    this.state$$ = this.store.state.change$
      .pipe(skip(1))
      .subscribe(() => this.onStateChange());
  }

  /**
   * Teardown store observers
   */
  private teardownObservers() {
    if (this.entities$$ !== undefined) {
      this.entities$$.unsubscribe();
    }
    if (this.state$$ !== undefined) {
      this.state$$.unsubscribe();
    }
    this.entities$$ = undefined;
    this.state$$ = undefined;
  }

  /**
   * When the entities change, always trigger the changes detection
   */
  private onEntitiesChange(entities: E[]) {
    this.detectChanges();
  }

  /**
   * When the entities state change, trigger the change detection
   * only if the component has not handled these changes yet. For example,
   * the component might have initiated thoses changes itself.
   */
  private onStateChange() {
    let changesDetected = false;
    const storeIndex = this.store.state.index;
    const innerIndex = this.innerStateIndex;

    if (storeIndex.size !== innerIndex.size) {
      changesDetected = this.detectChanges();
    }

    const storeKeys = Array.from(storeIndex.keys());
    for (let i = 0; i < storeKeys.length; i++) {
      const key = storeKeys[i];
      const storeValue = storeIndex.get(key);
      const innerValue = innerIndex.get(key);
      if (changesDetected === false) {
        if (innerValue === undefined) {
          changesDetected = this.detectChanges();
        } else if (!objectsAreEquivalent(storeValue, innerValue)) {
          changesDetected = this.detectChanges();
        }
      }

      this.innerStateIndex.set(key, Object.assign({}, storeValue));
    }
  }

  /**
   * Trigger the change detection of the controller is bound to a change detector
   */
  private detectChanges() {
    if (this.cdRef !== undefined) {
      this.cdRef.detectChanges();
    }
    return true;
  }

}
