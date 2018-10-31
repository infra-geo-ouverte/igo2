import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Record, RecordState } from './data.interface';

export class DataStore<T extends Record> {

  public records$ = new BehaviorSubject<T[]>([]);
  public states$ = new Subject<Map<string, RecordState>>();
  public focused$ = new Subject<T[]>();
  public selected$ = new Subject<T[]>();

  private states$$: Subscription;

  get states(): Map<string, RecordState> {
    return this._states;
  }
  set states(states: Map<string, RecordState>) {
    this._states = states;
    this.states$.next(states);
  }
  _states: Map<string, RecordState> = new Map();

  get empty() {
    return this.getRecords().length === 0;
  }

  constructor() {
    this.states$$ = this.states$
      .pipe(debounceTime(100))
      .subscribe(states => {
        const focused = this.getRecords()
          .filter(record => {
            return this.getRecordState(record).focused === true;
          });
        this.focused$.next(focused);

        const selected = this.getRecords()
          .filter(record => {
            return this.getRecordState(record).selected === true;
          });
        this.selected$.next(selected);
      });
  }

  destroy() {
    this.states$$.unsubscribe();
  }

  setRecords(records: T[], soft: boolean = false) {
    this.records$.next(records);
    if (soft === false) {
      this.resetStates();
    }
  }

  getRecords(): T[] {
    return this.records$.value;
  }

  getRecordState(record: T): RecordState {
    return this.states.get(record.rid) || {
      focused: false,
      selected: false
    } as RecordState;
  }

  clear(soft: boolean = false) {
    this.records$.next([]);
    if (soft === false) {
      this.resetStates();
    }
  }

  focus(record: T, exclusive: boolean = true) {
    if (exclusive === true) {
      this.unfocusAll();
    }
    this.updateRecordState(record, {focused: true});
  }

  select(record: T, focus: boolean = true, exclusive: boolean = true) {
    const state = {selected: true};
    if (focus === true) {
      state['focused'] = true;
    }

    if (exclusive === true) {
      this.unselectAll(focus);
    }
    this.updateRecordState(record, state);
  }

  unfocusAll() {
    this.updateRecordsState(this.getRecords(), {focused: false});
  }

  unselectAll(unfocus: boolean = true) {
    const state = {selected: false};
    if (unfocus === true) {
      state['focused'] = false;
    }
    this.updateRecordsState(this.getRecords(), state);
  }

  private updateRecordState(record: T, stateChanges: { [key: string]: any }) {
    const states = new Map(this.states);
    const state = this.getRecordState(record);
    states.set(record.rid, Object.assign(state, stateChanges));
    this.states = states;
  }

  private updateRecordsState(records: T[], stateChanges: { [key: string]: any }) {
    const states = new Map(this.states);
    records.forEach((record: T) => {
      const state = this.getRecordState(record);
      states.set(record.rid, Object.assign(state, stateChanges));
    });
    this.states = states;
  }

  private resetStates() {
    const states = new Map(this.states);
    const rids = this.getRecords().map((record: T) => record.rid);
    this.states.forEach((state: RecordState, key: string) => {
      if (rids.indexOf(key) < 0) {
        this.states.delete(key);
      }
    });
  }
}
