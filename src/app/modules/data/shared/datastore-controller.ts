import { ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { arrayEqual } from '../../utils/array';

import { Record } from './data.interface';
import { DataStore } from './datastore';

export class DataStoreController {

  private store: DataStore<Record>;

  private records$$: Subscription;
  private focused$$: Subscription;
  private focused: string[] = [];
  private selected$$: Subscription;
  private selected: string[] = [];

  private cdRef: ChangeDetectorRef;

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

    this.focused.splice(0, this.focused.length);
    this.selected.splice(0, this.selected.length);
    this.store = undefined;

    return this;
  }

  withChangeDetector(cdRef: ChangeDetectorRef): DataStoreController {
    this.cdRef = cdRef;
    return this;
  }

  focus(record: Record, exclusive: boolean = true) {
    if (exclusive === true) {
      this.focused.splice(0, this.focused.length);
    }
    this.focused.push(record.rid);
    this.store.focus(record, exclusive);
  }

  select(record: Record, focus: boolean = true, exclusive: boolean = true) {
    if (focus === true) {
      this.focus(record, exclusive);
    }
    if (exclusive === true) {
      this.selected.splice(0, this.selected.length);
    }
    this.selected.push(record.rid);
    this.store.select(record, focus, exclusive);
  }

  private watch(store: DataStore<Record>) {
    this.unwatch();

    this.records$$ = store.records$
      .subscribe((records: Record[]) => this.handleRecordsChange(records));

    this.focused$$ = store.focused$
      .pipe(
        filter((records: Record[]) => {
          const rids = records.map((record: Record) => record.rid);
          return !arrayEqual(rids, this.focused);
        })
      )
      .subscribe((records: Record[]) => this.handleFocusedChange(records));

    this.selected$$ = store.selected$
      .pipe(
        filter((records: Record[]) => {
          const rids = records.map((record: Record) => record.rid);
          return !arrayEqual(rids, this.selected);
        })
      )
      .subscribe((records: Record[]) => this.handleSelectedChange(records));
  }

  private unwatch() {
    if (this.store === undefined) {
      return;
    }
    this.records$$.unsubscribe();
    this.focused$$.unsubscribe();
    this.selected$$.unsubscribe();
  }

  private handleRecordsChange(records: Record[]) {
    if (this.cdRef !== undefined) {
      this.cdRef.detectChanges();
    }
  }

  private handleFocusedChange(records: Record[]) {
    this.focused = records.map((record: Record) => record.rid);
    if (this.cdRef !== undefined) {
      this.cdRef.detectChanges();
    }
  }

  private handleSelectedChange(records: Record[]) {
    this.selected = records.map((record: Record) => record.rid);
    if (this.cdRef !== undefined) {
      this.cdRef.detectChanges();
    }
  }

}
