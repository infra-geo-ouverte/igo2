import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Record, RecordState } from './data.interface';

export class DataStore<T extends Record, S extends RecordState = RecordState> {

  public records$ = new BehaviorSubject<T[]>([]);
  public states$ = new Subject<Map<string, S>>();
  public focused$ = new Subject<T[]>();
  public selected$ = new Subject<T[]>();

  private states$$: Subscription;

  get states(): Map<string, S> {
    return this._states;
  }
  set states(states: Map<string, S>) {
    this._states = states;
    this.states$.next(states);
  }
  _states: Map<string, S> = new Map();

  get empty() {
    return this.getRecords().length === 0;
  }

  constructor() {
    this.subscribeToStatesChanges();
  }

  destroy() {
    this.states$$.unsubscribe();
  }

  setRecords(records: T[], soft = false) {
    this.records$.next(records);
    if (soft === false) {
      this.resetStates();
    }
  }

  clear(soft = false) {
    this.setRecords([], soft);
  }

  getRecords(): T[] {
    return this.records$.value;
  }

  getRecordState(record: T): S {
    return this.states.get(record.rid) || {
      focused: false,
      selected: false
    } as S;
  }

  focus(record: T, exclusive = true) {
    if (exclusive === true) {
      this.unfocusAll();
    }
    this.updateRecordState(record, {focused: true});
  }

  unfocus(record: T) {
    this.updateRecordState(record, {focused: false});
  }

  unfocusAll() {
    this.updateRecordsState(this.getRecords(), {focused: false});
  }

  select(record: T, focus = true, exclusive = true) {
    const state = {selected: true};
    if (focus === true) {
      state['focused'] = true;
    }

    if (exclusive === true) {
      this.unselectAll(focus);
    }
    this.updateRecordState(record, state);
  }

  unselect(record: T, unfocus = true) {
    const state = {selected: false};
    if (unfocus === true) {
      state['focused'] = false;
    }
    this.updateRecordState(record, state);
  }

  unselectAll(unfocus = true) {
    const state = {selected: false};
    if (unfocus === true) {
      state['focused'] = false;
    }
    this.updateRecordsState(this.getRecords(), {selected: false});
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
    states.forEach((state: RecordState, key: string) => {
      if (rids.indexOf(key) < 0) {
        states.delete(key);
      }
    });
    this.states = states;
  }

  private subscribeToStatesChanges() {
    this.states$$ = this.states$
      .pipe(debounceTime(100))
      .subscribe(states => {
        const focused = this.getRecords()
          .filter(record => this.getRecordState(record).focused === true);
        this.focused$.next(focused);

        const selected = this.getRecords()
          .filter(record => this.getRecordState(record).selected === true);
        this.selected$.next(selected);
      });
  }
}
