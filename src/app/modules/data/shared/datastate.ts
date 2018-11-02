import { Subject } from 'rxjs';
import { RecordState } from './data.interface';

export class DataState<S extends { [key: string]: any } = RecordState> {

  public states$ = new Subject<Map<string, S>>();

  get states(): Map<string, S> {
    return this._states;
  }
  set states(states: Map<string, S>) {
    this._states = states;
    this.states$.next(states);
  }
  _states: Map<string, S> = new Map();

  get observable(): Subject<Map<string, S>> {
    return this.states$;
  } 

  constructor() {}

  getByKey(key: string): S {
    return (this.states.get(key) || {}) as S;
  }

  setByKey(key: string, state: S) {
    this.setByKeys([key], state);
  }

  setByKeys(keys: string[], state: S) {
    const states = new Map(this.states);
    keys.forEach((key: string) => states.set(key, state));
    this.states = states;
  }

  setAll(state: S) {
    this.setByKeys(Array.from(this.states.keys()), state);
  }

  updateByKey(key: string, changes: { [key: string]: any }) {
    this.updateByKeys([key], changes);
  }

  updateByKeys(keys: string[], changes: { [key: string]: any }) {
    const states = new Map(this.states);
    keys.forEach((key: string) => {
      const state = this.getByKey(key);
      states.set(key, Object.assign(state, changes));
    });
    this.states = states;
  }

  updateAll(changes: { [key: string]: any }) {
    this.updateByKeys(Array.from(this.states.keys()), changes);
  }

  reset() {
    this.states = new Map();
  }
}
