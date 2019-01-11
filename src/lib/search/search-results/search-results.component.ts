import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';

import { EntityStore, EntityStoreController } from 'src/lib/entity';

import { SearchResult } from '../shared';

export enum SearchResultMode {
  Grouped = 'grouped',
  Flat = 'flat'
}

@Component({
  selector: 'fadq-search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public searchResultMode = SearchResultMode;

  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<SearchResult> {
    return this._store;
  }
  set store(value: EntityStore<SearchResult>) {
    this._store = value;
  }
  private _store;

  @Input()
  get mode(): SearchResultMode {
    return this._mode;
  }
  set mode(value: SearchResultMode) {
    this._mode = value;
  }
  private _mode: SearchResultMode = SearchResultMode.Grouped;

  @Output() resultFocus = new EventEmitter<SearchResult>();
  @Output() resultSelect = new EventEmitter<SearchResult>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.controller.bindStore(this.store);
  }

  ngOnDestroy() {
    this.controller.unbindStore();
  }

  sortByOrder(result1: SearchResult, result2: SearchResult) {
    return (result1.source.displayOrder - result2.source.displayOrder);
  }

  onResultFocus(result: SearchResult) {
    this.controller.updateEntityState(result, {focused: true}, true);
    this.resultFocus.emit(result);
  }

  onResultSelect(result: SearchResult) {
    this.controller.updateEntityState(result, {
      focused: true,
      selected: true
    }, true);
    this.resultSelect.emit(result);
  }

}
