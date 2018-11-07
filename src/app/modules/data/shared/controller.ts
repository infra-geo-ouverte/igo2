import { ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';

import { isEquivalent } from '../../utils/object';
import { Record } from './data.interface';
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

    this.stateWatcher$$ = store
      .observeBy((record: Record, state: { [key: string]: boolean }) => true)
      .subscribe((records: Record[]) => this.handleStateChanges(records));
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

  private handleStateChanges(records: Record[]) {
    let detectChanges = false;
    records.forEach((record: Record) => {
      const state = this.store.getRecordState(record);
      const innerState = this.innerState.get(record.rid);
      if (innerState === undefined) {
        detectChanges = true;
      } else if (this.cdRef !== undefined && detectChanges === false) {
        detectChanges = !isEquivalent(state, innerState);
      }
      this.innerState.set(record.rid, state);
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
