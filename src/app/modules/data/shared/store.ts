import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { Record, RecordState } from './data.interface';
import { DataState } from './state';

export class DataStore<T extends Record, S extends { [key: string]: boolean } = RecordState> {

  private records$ = new BehaviorSubject<T[]>([]);
  private state$$: Subscription;

  get state(): DataState<S> {
    return this._state;
  }
  set state(value: DataState<S>) {
    this._state = value;
  }
  _state: DataState<S>;

  get observable(): BehaviorSubject<T[]> {
    return this.records$;
  }

  get records(): T[] {
    return this.records$.value;
  }

  get empty(): boolean {
    return this.records.length === 0;
  }

  constructor(state?: DataState<S>) {
    if (state === undefined) {
      state = new DataState<S>();
    }
    this.state = state;
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
      this.state.reset();
    }
  }

  addRecords(records: T[], soft = false) {
    this.setRecords(this.records.concat(records), soft);
  }

  getRecordByRid(rid: string): T {
    return this.records.find((record: T) => record.rid === rid);
  }

  getRecordState(record: T): S {
    return this.state.getByKey(record.rid) || {} as S;
  }

  updateRecordState(record: T, changes: { [key: string]: boolean }, exclusive = false) {
    this.state.updateByKey(record.rid, changes, exclusive);
  }

  updateAllRecordsState(changes: { [key: string]: boolean }) {
    this.state.updateAll(changes);
  }

  observeBy(filterBy: (record: T, state: S) => boolean): Observable<T[]> {
    return combineLatest(this.observable, this.state.observable)
      .pipe(
        debounceTime(50),
        map((value: [T[], S]) => {
          const records = value[0];
          return records.filter((record: T) => {
            return filterBy(record, this.getRecordState(record));
          });
        })
      );
  }
}
