import { BehaviorSubject } from 'rxjs';

import { State } from './entity.interfaces';

/**
 * This class is used to track entities' state
 */
export class EntityState<S extends { [key: string]: boolean } = State> {

  /**
   * Observable of a Key -> State mapping
   */
  public states$ = new BehaviorSubject<Map<string, S>>(new Map());

  /**
   * Current state mapping
   */
  get value(): Map<string, S> {
    return this.states$.value;
  }

  constructor() {}

  /**
   * Get state by key
   * @param key Key
   * @returns returns State associated to this key or {}
   */
  getByKey(key: string): S {
    return (this.states$.value.get(key) || {}) as S;
  }

  /**
   * Set state by key
   * @param key Key
   * @param state State
   */
  setByKey(key: string, state: S) {
    this.setByKeys([key], state);
  }

  /**
   * Set multiple state by keys
   * @param keys Keys
   * @param state State
   */
  setByKeys(keys: string[], state: S) {
    const states = new Map(this.states$.value);
    keys.forEach((key: string) => states.set(key, Object.assign({}, state)));
    this.states$.next(states);
  }

  /**
   * Set state for all existing keys
   * @param state State
   */
  setAll(state: S) {
    this.setByKeys(Array.from(this.states$.value.keys()), state);
  }

  /**
   * Update a state by key
   * @param key Key
   * @param changes State changes
   * @param exclusive Whether this key should be the only one in that state
   */
  updateByKey(key: string, changes: { [key: string]: boolean }, exclusive = false) {
    this.updateByKeys([key], changes, exclusive);
  }

  /**
   * Update multiple states by keys
   * @param keys Keys
   * @param changes State changes
   * @param exclusive Whether these keys should be the only one in that state
   */
  updateByKeys(keys: string[], changes: { [key: string]: boolean }, exclusive = false) {
    if (exclusive === true) {
      this.updateByKeysExclusive(keys, changes);
      return;
    }

    const states = new Map(this.states$.value);
    keys.forEach((key: string) => {
      const state = this.getByKey(key);
      states.set(key, Object.assign(state, changes));
    });
    this.states$.next(states);
  }

  /**
   * Update the state for all existing keys
   * @param changes State changes
   */
  updateAll(changes: { [key: string]: boolean }) {
    this.updateByKeys(Array.from(this.states$.value.keys()), changes);
  }

  /**
   * Clear state and flush all keys
   */
  reset() {
    if (this.value.size > 0) {
      this.states$.next(new Map());
    }
  }

  /**
   * Update multiple states by keys (exclusive)
   * @param keys Keys
   * @param changes State changes
   */
  private updateByKeysExclusive(keys: string[], changes: { [key: string]: boolean }) {
    const otherChanges = {};
    Object.entries(changes).forEach(([changeKey, value]) => {
      otherChanges[changeKey] = !value;
    });

    const states = new Map();
    const allKeys = new Set(keys.concat(Array.from(this.value.keys())));
    allKeys.forEach((key: string) => {
      const state = this.getByKey(key);
      if (states && keys.indexOf(key) >= 0) {
        states.set(key, Object.assign(state, changes));
      } else {
        states.set(key, Object.assign(state, otherChanges));
      }
    });

    this.states$.next(states);
  }
}
