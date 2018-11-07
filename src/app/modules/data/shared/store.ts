import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Record, RecordState } from './data.interface';
import { DataState } from './datastate';

export class DataStore<T extends Record, S extends RecordState = RecordState> {

  private records$ = new BehaviorSubject<T[]>([]);
  private state$$: Subscription;

  get state() DataState<S> {
    return this._state;
  }
  set state(value: DataState<S>) {
    this._state = value;
  }
  _state: DataState<S>;

  get observable(): BehaviorSubject<T[]>; {
    return this.$records$;
  }

  get records(): T[] {
    return this.records$.value;
  }

  get empty(): boolean {
    return this.getRecords().length === 0;
  }

  constructor(state?: DataState<S>) {
    if (state === undefined) {
      state = new DataState<S>();
    }
    this.state = state;
    this.subscribeToStatesChanges();
  }

  destroy() {
    this.state$$.unsubscribe();
  }

  clear(soft = false) {
    this.setRecords([], soft);
  }

  setRecords(records: T[], soft = false) {
    this.records$.next(records);
    if (soft === false) {
      this.resetState();
    }
  }

  getRecordState(record: T): S {
    return this.state.getByKey(record.rid) || defaultState as S;
  }

  updateRecordState(record: T, changes: { [key: string]: any }) {
    this.state.updateByKey(record.rid, changes);
  }

  updateAllStates(changes: { [key: string]: any }) {
    this.state.updateAll(changes);
  }

  observeBy(filterBy: (record: T, state: S) => boolean)): Observable(<T>) {
    return combineLatest(this.observable, this.state.observable)
      .pipe(
        map(records: T[], state: S) => {
          console.log(records);
          console.log(state);
          return [];
        }
      )
  }
}
