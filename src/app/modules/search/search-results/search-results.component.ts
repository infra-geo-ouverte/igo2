import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit
} from '@angular/core';


import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/datastore';
import { DataStoreController } from '../../data/shared/datastore-controller';
import { SearchSource } from '../shared/sources/source';

export enum DisplayMode {
  Grouped = 'grouped',
  Flat = 'flat'
}

@Component({
  selector: 'fadq-search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public displayMode = DisplayMode;

  private controller: DataStoreController;
  private ready: boolean = false;

  @Input()
  get store(): DataStore<Record> {
    return this._store;
  }
  set store(value: DataStore<Record>) {
    this._store = value;
  }
  private _store;

  @Input()
  get mode(): DisplayMode {
    return this._mode;
  }
  set mode(value: DisplayMode) {
    this._mode = value;
  }
  private _mode: DisplayMode = DisplayMode.Grouped;

  @Output() focus = new EventEmitter<Record>();
  @Output() select = new EventEmitter<Record>();
  @Output() unfocus = new EventEmitter<Record>();
  @Output() unselect = new EventEmitter<Record>();

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.controller = new DataStoreController()
      .withChangeDetector(this.cdRef)
      .bind(this.store);

    // This is required because igoListItem immediately
    // emit an event when a record is set to "focused" or "selected"
    // but, at that time our controller is not even initialized.
    this.ready = true;
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  sortByOrder(record1: Record, record2: Record) {
    return (
      (record1.provider as any as SearchSource).displayOrder -
      (record2.provider as any as SearchSource).displayOrder
    );
  }

  focusRecord(record: Record) {
    if (!this.ready) {
      return;
    }
    this.controller.focus(record, true);
    this.focus.emit(record);
  }

  selectRecord(record: Record) {
    if (!this.ready) {
      return;
    }
    this.controller.select(record, true, true);
    this.select.emit(record);
  }

}
