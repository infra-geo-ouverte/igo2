import { BehaviorSubject } from 'rxjs';
import { RecordState } from './data.interface';

export class DataState<S extends { [key: string]: any } = RecordState> {

  public states$ = new BehaviorSubject<Map<string, S>>(new Map());

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
    keys.forEach((key: string) => states.set(key, state));
    this.states$.next(states);
  }

  setAll(state: S) {
    this.setByKeys(Array.from(this.states$.value.keys()), state);
  }

  updateByKey(key: string, changes: { [key: string]: any }) {
    this.updateByKeys([key], changes);
  }

  updateByKeys(keys: string[], changes: { [key: string]: any }) {
    const states = new Map(this.states$.value);
    keys.forEach((key: string) => {
      const state = this.getByKey(key);
      states.set(key, Object.assign(state, changes));
    });
    this.states$.next(states);
  }

  updateAll(changes: { [key: string]: any }) {
    this.updateByKeys(Array.from(this.states$.value.keys()), changes);
  }

  reset() {
    this.states$.next(new Map());
  }
}
