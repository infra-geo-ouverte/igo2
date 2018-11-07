import { ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';

import { isEquivalent } from '../../utils/object';
import { Record, RecordState } from './data.interface';
import { DataStore } from './store';

export class DataStoreController {

  private store: DataStore<Record>;
  private cdRef: ChangeDetectorRef;

  private recordWatcher$$: Subscription;
  private stateWatcher$$: Subscription;
  private innerState = new Map();
  private firstDetection = false;

  constructor(store?: DataStore<Record>) {
    if (store !== undefined) {
      this.bind(store);
    }
  }

  getStore(): DataStore<Record> {
    return this.store;
  }

  bind(store: DataStore<Record>): DataStoreController {
    this.unbind();
    this.watch(store);
    this.store = store;

    return this;
  }

  unbind(): DataStoreController {
    this.unwatch();

    this.innerState = new Map();
    this.store = undefined;

    return this;
  }

  withChangeDetector(cdRef: ChangeDetectorRef): DataStoreController {
    this.cdRef = cdRef;
    return this;
  }

  updateRecordState(record: Record, changes: { [key: string]: boolean }, exclusive = false) {
    if (this.store === undefined) {
      return;
    }
    this.store.updateRecordState(record, changes, exclusive);
  }

  private watch(store: DataStore<Record>) {
    this.unwatch();

    this.recordWatcher$$ = store.observable
      .subscribe((records: Record[]) => this.handleRecordChanges(records));

    this.stateWatcher$$ = store.state.observable
      .subscribe((state: Map<string, RecordState>) => this.handleStateChanges(state));
  }

  private unwatch() {
    if (this.store === undefined) {
      return;
    }
    this.recordWatcher$$.unsubscribe();
    this.stateWatcher$$.unsubscribe();
  }

  private handleRecordChanges(records: Record[]) {
    this.firstDetection = true;
    if (this.cdRef !== undefined) {
      this.cdRef.detectChanges();
    }
  }

  private handleStateChanges(state: Map<string, RecordState>) {
    let detectChanges = false;

    const rids = Array.from(state.keys());
    rids.forEach((rid: string) => {
      const storeState = state.get(rid);
      const innerState = this.innerState.get(rid);
      if (innerState === undefined) {
        detectChanges = true;
      } else if (this.cdRef !== undefined && detectChanges === false) {
        detectChanges = !isEquivalent(storeState, innerState);
      }
      this.innerState.set(rid, storeState);
    });

    if (
      this.cdRef !== undefined &&
      detectChanges !== false &&
      this.firstDetection === false) {
      this.cdRef.detectChanges();
    }

    this.firstDetection = false;
  }

}
