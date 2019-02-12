import { ReplaySubject } from 'rxjs';

import { EntityKey, EntityState, EntityStateManagerOptions } from './entity.interfaces';
import { getEntityId } from './entity.utils';

/**
 * This class is used to track a store's entities state
 */
export class EntityStateManager<E extends object, S extends EntityState = EntityState> {

  /**
   * State index
   */
  readonly index = new Map<EntityKey, S>();

  /**
   * Change emitter
   */
  readonly change$ = new ReplaySubject<void>(1);

  /**
   * Method to get an entity's id
   */
  readonly getKey: (E) => EntityKey;

  constructor(options: EntityStateManagerOptions = {}) {
    this.getKey = options.getKey ? options.getKey : getEntityId;
    this.next();
  }

  /**
   * Clear state
   */
  clear() {
    if (this.index.size > 0) {
      this.index.clear();
      this.next();
    }
  }

  /**
   * Get an entity's state
   * @param entity Entity
   * @returns State
   */
  get(entity: E): S {
    return (this.index.get(this.getKey(entity)) || {}) as S;
  }

  /**
   * Set an entity's state
   * @param entity Entity
   * @param state State
   */
  set(entity: E, state: S) {
    this.setMany([entity], state);
  }

  /**
   * Set many entitie's state
   * @param entitie Entities
   * @param state State
   */
  setMany(entities: E[], state: S) {
    entities.forEach((entity: E) => {
      this.index.set(this.getKey(entity), Object.assign({}, state));
    });
    this.next();
  }

  /**
   * Set state of all entities that already have a state. This is not
   * the same as setting the state of all the store's entities.
   * @param state State
   */
  setAll(state: S) {
    Array.from(this.index.keys()).forEach((key: EntityKey) => {
      this.index.set(key, Object.assign({}, state));
    });
    this.next();
  }

  /**
   * Update an entity's state
   * @param entity Entity
   * @param changes State changes
   */
  update(entity: E, changes: Partial<S>, exclusive = false) {
    this.updateMany([entity], changes, exclusive);
  }

  /**
   * Update many entitie's state
   * @param entitie Entities
   * @param changes State changes
   */
  updateMany(entities: E[], changes: Partial<S>, exclusive = false) {
    if (exclusive === true) {
      return this.updateManyExclusive(entities, changes);
    }

    entities.forEach((entity: E) => {
      const state = Object.assign(this.get(entity), changes);
      this.index.set(this.getKey(entity), state);
    });
    this.next();
  }

  /**
   * Update state of all entities that already have a state. This is not
   * the same as updating the state of all the store's entities.
   * @param changes State
   */
  updateAll(changes: Partial<S>) {
    Array.from(this.index.keys()).forEach((key: EntityKey) => {
      const state = Object.assign(this.index.get(key), changes);
      this.index.set(key, state);
    });
    this.next();
  }

  /**
   * When some state changes are flagged as 'exclusive', reverse
   * the state of all other entities. Changes are reversable when
   * they are boolean.
   * @param entitie Entities
   * @param changes State changes
   */
  private updateManyExclusive(entities: E[], changes: Partial<S>) {
    const reverseChanges = this.reverseChanges(changes);

    const keys = entities.map((entity: E) => this.getKey(entity));
    const allKeys = new Set(keys.concat(Array.from(this.index.keys())));
    allKeys.forEach((key: EntityKey) => {
      const state = this.index.get(key) || {} as S;
      if (keys.indexOf(key) >= 0) {
        this.index.set(key, Object.assign(state, changes));
      } else {
        this.index.set(key, Object.assign(state, reverseChanges));
      }
    });

    this.next();
  }

  /**
   * Compute a 'reversed' version of some state changes.
   * Changes are reversable when they are boolean.
   * @param changes State changes
   * @returns Reversed state changes
   */
  private reverseChanges(changes: Partial<S>): Partial<S> {
    return Object.entries(changes).reduce((reverseChanges: Partial<S>, bunch: [string, any]) => {
      const [changeKey, value] = bunch;
      if (typeof value === typeof true) {
        reverseChanges[changeKey] = !value;
      }
      return reverseChanges;
    }, {});
  }

  /**
   * Emit 'change' event
   */
  private next() {
    this.change$.next();
  }
}
