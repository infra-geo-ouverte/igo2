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

/**
 * List of search results with focus and selection capabilities.
 * This component is dumb and only emits events.
 */
@Component({
  selector: 'fadq-search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  /**
   * Reference to the SearchResultMode enum
   * @internal
   */
  public searchResultMode = SearchResultMode;

  /**
   * Search results store controller
   */
  private controller: EntityStoreController;

  /**
   * Search results store
   */
  @Input() store: EntityStore<SearchResult>;

  /**
   * Search results display mode
   */
  @Input() mode: SearchResultMode = SearchResultMode.Grouped;

  /**
   * Event emitted when a result is focused
   */
  @Output() resultFocus = new EventEmitter<SearchResult>();

  /**
   * Event emitted when a result is selected
   */
  @Output() resultSelect = new EventEmitter<SearchResult>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  /**
   * Bind the search results store to the controller
   * @internal
   */
  ngOnInit() {
    this.controller.bindStore(this.store);
  }

  /**
   * Unbind the search results store from the controller
   * @internal
   */
  ngOnDestroy() {
    this.controller.unbindStore();
  }

  /**
   * Sort the results by display order. Results are not sorted at the store
   * level.
   * @param result1 First result
   * @param result2 Second result
   * @internal
   */
  sortByOrder(result1: SearchResult, result2: SearchResult) {
    return (result1.source.displayOrder - result2.source.displayOrder);
  }

  /**
   * When a result is focused, update it's state in the store and emit
   * an event.
   * @param result Search result
   * @internal
   */
  onResultFocus(result: SearchResult) {
    this.controller.updateEntityState(result, {focused: true}, true);
    this.resultFocus.emit(result);
  }

  /**
   * When a result is selected, update it's state in the store and emit
   * an event. A selected result is also considered focused
   * @param result Search result
   * @internal
   */
  onResultSelect(result: SearchResult) {
    this.controller.updateEntityState(result, {
      focused: true,
      selected: true
    }, true);
    this.resultSelect.emit(result);
  }

}
