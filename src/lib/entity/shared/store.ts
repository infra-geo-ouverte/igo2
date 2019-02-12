import { BehaviorSubject } from 'rxjs';

import { EntityStateManager } from './state';
import { EntityView } from './view';
import { EntityKey, EntityState, EntityRecord, EntityStoreOptions } from './entity.interfaces';
import { getEntityId, getEntityProperty } from './entity.utils';

/**
 * An entity store class holds any number of entities
 * as well as their state. It can be observed, filtered and sorted and
 * provides methods to insert, update or delete entities.
 */
export class EntityStore<E extends object, S extends EntityState = EntityState> {

  /**
   * Entity store state
   */
  readonly state = new EntityStateManager<E, S>();

  /**
   * Observable of the raw entities
   */
  readonly entities$ = new BehaviorSubject<E[]>([]);

  /**
   * View of all the entities
   */
  readonly view = new EntityView<E>(this.entities$);

  /**
   * View of all the entities and their state
   */
  readonly stateView = new EntityView<E, EntityRecord<E, S>>(this.view.all$()).join({
    source: this.state.change$,
    reduce: (entity: E): EntityRecord<E, S> => {
      return {entity, state: this.state.get(entity)};
    }
  });

  /**
   * Method to get an entity's id
   */
  readonly getKey: (E) => EntityKey;

  /**
   * Method to get an entity's named property
   */
  readonly getProperty: (E, string) => any;

  /**
   * Store index
   */
  get index(): Map<EntityKey, E> { return this._index; }
  private _index: Map<EntityKey, E>;

  constructor(entities: E[], options: EntityStoreOptions = {}) {
    this.getKey = options.getKey ? options.getKey : getEntityId;
    this.getProperty = options.getProperty ? options.getProperty : getEntityProperty;
    this.view.lift();
    this.stateView.lift();
    if (entities.length > 0) {
      this.load(entities);
    } else {
      this._index = this.generateIndex(entities);
    }
  }

  /**
   * Get an entity from the store by key
   * @param key Key
   * @returns Entity
   */
  get(key: EntityKey): E {
    return this.index.get(key);
  }

  /**
   * Set this store's entities
   * @param entities Entities
   */
  load(entities: E[]) {
    this._index = this.generateIndex(entities);
    this.next();
  }

  /**
   * Clear the store's entities but keep the state and views intact.
   * Views won't return any data but future data will be subject to the
   * current views filter and sort
   */
  softClear() {
    if (this.index && this.index.size > 0) {
      this.index.clear();
      this.next();
    }
  }

  /**
   * Clear the store's entities, state and views
   */
  clear() {
    this.stateView.clear();
    this.view.clear();
    this.state.clear();
    this.softClear();
  }

  destroy() {
    this.stateView.destroy();
    this.view.destroy();
    this.clear();
  }

  /**
   * Insert an entity into the store
   * @param entity Entity
   */
  insert(entity: E) {
    this.insertMany([entity]);
  }

  /**
   * Insert many entities into the store
   * @param entities Entities
   */
  insertMany(entities: E[]) {
    entities.forEach((entity: E) => this.index.set(this.getKey(entity), entity));
    this.next();
  }

  /**
   * Update or insert an entity into the store
   * @param entity Entity
   */
  update(entity: E) {
    this.updateMany([entity]);
  }

  /**
   * Update or insert many entities into the store
   * @param entities Entities
   */
  updateMany(entities: E[]) {
    entities.forEach((entity: E) => this.index.set(this.getKey(entity), entity));
    this.next();
  }

  /**
   * Delete an entity from the store
   * @param entity Entity
   */
  delete(entity: E) {
    this.deleteMany([entity]);
  }

  /**
   * Delete many entities from the store
   * @param entities Entities
   */
  deleteMany(entities: E[]) {
    entities.forEach((entity: E) => this.index.delete(this.getKey(entity)));
    this.next();
  }

  /**
   * Generate a complete index of all the entities
   * @param entities Entities
   * @returns Index
   */
  private generateIndex(entities: E[]): Map<EntityKey, E> {
    const entries = entities.map((entity: E) => [this.getKey(entity), entity]);
    return new Map(entries as [EntityKey, E][]);
  }

  /**
   * Push the index's entities into the entities$ observable
   */
  private next() {
    this.entities$.next(Array.from(this.index.values()));
  }

}
