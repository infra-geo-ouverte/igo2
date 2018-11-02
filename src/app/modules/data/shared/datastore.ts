import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Record, RecordState } from './data.interface';
import { DataState } from './datastate';

export class DataStore<T extends Record, S extends RecordState = RecordState> {

  public records$ = new BehaviorSubject<T[]>([]);
  public focused$ = new Subject<T[]>();
  public selected$ = new Subject<T[]>();

  private state: DataState<S>;
  private state$$: Subscription;

  get empty() {
    return this.getRecords().length === 0;
  }

  constructor(state: DataState<S> = undefined) {
    if (state === undefined) {
      state = new DataState<S>();
    }
    this.state = state;
    this.subscribeToStatesChanges();
  }

  destroy() {
    this.state$$.unsubscribe();
  }

  setRecords(records: T[], soft = false) {
    this.records$.next(records);
    if (soft === false) {
      this.resetState();
    }
  }

  clear(soft = false) {
    this.setRecords([], soft);
  }

  getRecords(): T[] {
    return this.records$.value;
  }

  getRecordState(record: T): S {
    const defaultState = {
      focused: false,
      selected: false
    };
    return this.state.getByKey(record.rid) || defaultState as S;
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
    this.updateAllStates({focused: false});
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
    const changes = {selected: false};
    if (unfocus === true) {
      changes['focused'] = false;
    }
    this.updateRecordState(record, changes);
  }

  unselectAll(unfocus = true) {
    const changes = {selected: false};
    if (unfocus === true) {
      changes['focused'] = false;
    }
    this.updateAllStates(changes);
  }

  resetState() {
    this.state.reset();
  }

  getStateManager(): DataState<S> {
    return this.state;
  }

  private updateRecordState(record: T, changes: { [key: string]: any }) {
    this.state.updateByKey(record.rid, changes);
  }

  private updateAllStates(changes: { [key: string]: any }) {
    this.state.updateAll(changes);
  }

  private subscribeToStatesChanges() {
    this.state$$ = this.state.observable
      .pipe(debounceTime(100))
      .subscribe(state => {
        const focused = this.getRecords()
          .filter(record => this.getRecordState(record).focused === true);
        this.focused$.next(focused);

        const selected = this.getRecords()
          .filter(record => this.getRecordState(record).selected === true);
        this.selected$.next(selected);
      });
  }
}
