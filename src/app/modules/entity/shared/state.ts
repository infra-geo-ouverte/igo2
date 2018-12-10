import { BehaviorSubject } from 'rxjs';

import { State } from './entity.interfaces';

export class EntityState<S extends { [key: string]: boolean } = State> {

  public states$ = new BehaviorSubject<Map<string, S>>(new Map());

  get value(): Map<string, S> {
    return this.states$.value;
  }

  get observable(): BehaviorSubject<Map<string, S>> {
    return this.states$;
  }

  constructor() {}

  getByKey(key: string): S {
    return (this.states$.value.get(key) || {}) as S;
  }

  setByKey(key: string, state: S) {
    this.setByKeys([key], state);
  }

  setByKeys(keys: string[], state: S) {
    const states = new Map(this.states$.value);
    keys.forEach((key: string) => states.set(key, Object.assign({}, state)));
    this.states$.next(states);
  }

  setAll(state: S) {
    this.setByKeys(Array.from(this.states$.value.keys()), state);
  }

  updateByKey(key: string, changes: { [key: string]: boolean }, exclusive = false) {
    this.updateByKeys([key], changes, exclusive);
  }

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

  updateAll(changes: { [key: string]: boolean }) {
    this.updateByKeys(Array.from(this.states$.value.keys()), changes);
  }

  reset() {
    if (this.value.size > 0) {
      this.states$.next(new Map());
    }
  }

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
