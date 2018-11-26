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

import { EntityStore } from '../../entity/shared/store';
import { EntityStoreController } from '../../entity/shared/controller';
import { SearchResult } from '../shared/search.interface';

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
  get mode(): DisplayMode {
    return this._mode;
  }
  set mode(value: DisplayMode) {
    this._mode = value;
  }
  private _mode: DisplayMode = DisplayMode.Grouped;

  @Output() resultFocus = new EventEmitter<SearchResult>();
  @Output() resultSelect = new EventEmitter<SearchResult>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.controller.bind(this.store);
  }

  ngOnDestroy() {
    this.controller.unbind();
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
