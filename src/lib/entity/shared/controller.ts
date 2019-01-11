import { ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { isEquivalent } from 'src/lib/utils';

import { Entity } from './entity.interfaces';
import { EntityStore } from './store';
import { EntityState } from './state';
import { getEntityId } from './entity.utils';

/**
 * This class is used to synschronize a component's changes
 * detection with an EntityStore changes. For example, it is frequent
 * to have a component subscribe to a store's selected entity and, at the same time,
 * this component provides a way to select an entity with, let's say, a click.
 *
 * This class automatically handles that can of case a triggers the compoent's
 * change detection when needed.
 */
export class EntityStoreController {

  /**
   * Component change detector
   */
  private cdRef: ChangeDetectorRef;

  /**
   * Entity store
   */
  private store: EntityStore<Entity>;

  /**
   * Component inner state
   */
  private innerState = new EntityState();

  /**
   * Subscription to the store's raw entities
   */
  private entities$$: Subscription;

  /**
   * Subscription to the store's state
   */
  private state$$: Subscription;

  constructor() {}

  /**
   * Bind this controller to a store and start watching for changes
   * @param store Entity store
   * @returns
   */
  bindStore(store: EntityStore<Entity>): EntityStoreController {
    this.unbindStore();
    this.store = store;
    this.watchStore();
    this.detectChanges();
    return this;
  }

  /**
   * Unbind this controller from a store and stop watching for changes
   * @param store Entity store
   * @returns
   */
  unbindStore(): EntityStoreController {
    this.unwatchStore();
    this.innerState.reset();
    this.store = undefined;
    return this;
  }

  /**
   * Bind this controller to a component's change detector
   * @param cdRef Change detector
   * @returns
   */
  withChangeDetector(cdRef: ChangeDetectorRef): EntityStoreController {
    this.cdRef = cdRef;
    return this;
  }

  /**
   * Update an entity state
   * @param entity Entity
   * @param changes State changes
   * @param exclusive Whether this entity should be the only one in that state
   */
  updateEntityState(entity: Entity, changes: { [key: string]: boolean }, exclusive = false) {
    if (this.store === undefined) {
      return;
    }
    this.store.updateEntityState(entity, changes, exclusive);
  }

  /**
   * Update many entities state
   * @param entities Entities
   * @param changes State changes
   * @param exclusive Whether these entities should be the only one in that state
   */
  updateEntitiesState(entities: Entity[], changes: { [key: string]: boolean }, exclusive = false) {
    if (this.store === undefined) {
      return;
    }
    this.store.updateEntitiesState(entities, changes, exclusive);
  }

  /**
   * Update all entities state
   * @param changes State changes
   */
  updateAllEntitiesState(changes: { [key: string]: boolean }) {
    if (this.store === undefined) {
      return;
    }
    this.store.updateAllEntitiesState(changes);
  }

  /**
   * Start watching a store for changes in it's entities and their state
   * @param store Entity store
   */
  private watchStore() {
    this.unwatchStore();

    this.entities$$ = this.store.rawEntities$
      .subscribe((entities: Entity[]) => this.onEntitiesChange(entities));

    this.state$$ = this.store.state.states$
      .pipe(skip(1))
      .subscribe(() => this.onStateChange());
  }

  /**
   * Stop watching a store for changes in it's entities and their state
   */
  private unwatchStore() {
    if (this.entities$$ !== undefined) {
      this.entities$$.unsubscribe();
    }
    if (this.state$$ !== undefined) {
      this.state$$.unsubscribe();
    }
  }

  /**
   * When the entities change, always trigger the changes detection
   */
  private onEntitiesChange(entities: Entity[]) {
    this.detectChanges();
  }

  /**
   * When the entities state change, trigger the change detection
   * only if the component has not handled these changes yet. For example,
   * the component might have initiated thoses changes itself.
   */
  private onStateChange() {
    let detectChanges = false;

    this.store.entities.forEach((entity: Entity) => {
      const key = getEntityId(entity);
      const storeState = this.store.getEntityState(entity);
      const innerState = this.innerState.getByKey(key);
      if (innerState === undefined) {
        detectChanges = true;
      } else if (this.cdRef !== undefined && detectChanges === false) {
        detectChanges = !isEquivalent(storeState, innerState);
      }
      this.innerState.setByKey(key, Object.assign({}, storeState));
    });

    if (detectChanges !== false) {
      this.detectChanges();
    }
  }

  /**
   * Trigger the change detection of the controller is bound to a change detector
   */
  private detectChanges() {
    if (this.cdRef !== undefined) {
      this.cdRef.detectChanges();
    }
  }

}
