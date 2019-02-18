import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Observable, EMPTY, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';

import { EntityStore, EntityStoreController } from 'src/lib/entity';

import { SearchResult, SearchSource } from '../shared';

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
  private controller: EntityStoreController<SearchResult>;

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

  get results$(): Observable<{source: SearchSource, results: SearchResult[]}[]> {
    if (this._results$ === undefined) { this._results$ = this.liftResults(); }
    return this._results$;
  }
  private _results$: Observable<{source: SearchSource, results: SearchResult[]}[]>;

  constructor(private cdRef: ChangeDetectorRef) {}

  /**
   * Bind the search results store to the controller
   * @internal
   */
  ngOnInit() {
    this.controller = new EntityStoreController(this.store, this.cdRef);
  }

  /**
   * Unbind the search results store from the controller
   * @internal
   */
  ngOnDestroy() {
    this.controller.destroy();
  }

  /**
   * When a result is focused, update it's state in the store and emit
   * an event.
   * @param result Search result
   * @internal
   */
  onResultFocus(result: SearchResult) {
    this.store.state.update(result, {focused: true}, true);
    this.resultFocus.emit(result);
  }

  /**
   * When a result is selected, update it's state in the store and emit
   * an event. A selected result is also considered focused
   * @param result Search result
   * @internal
   */
  onResultSelect(result: SearchResult) {
    this.store.state.update(result, {
      focused: true,
      selected: true
    }, true);
    this.resultSelect.emit(result);
  }

  /**
   * Return an observable of the search results, grouped by search source
   * @returns Observable of grouped search results
   * @internal
   */
  private liftResults(): Observable<{source: SearchSource, results: SearchResult[]}[]> {
    return this.store.view.all$()
      .pipe(
        debounce((results: SearchResult[]) => {
          return results.length === 0 ? EMPTY : timer(200);
        }),
        map((results: SearchResult[]) => {
          return this.groupResults(results.sort(this.sortByOrder));
        })
      );
  }

  /**
   * Sort the results by display order.
   * @param r1 First result
   * @param r2 Second result
   */
  private sortByOrder(r1: SearchResult, r2: SearchResult) {
    return (r1.source.displayOrder - r2.source.displayOrder);
  }

  /**
   * Group results by search source
   * @param results Search results from all sources
   * @returns Search results grouped by source
   */
  private groupResults(results:  SearchResult[]): {source: SearchSource, results: SearchResult[]}[] {
    const grouped = new Map<SearchSource, SearchResult[]>();
    results.forEach((result: SearchResult) => {
      const source = result.source;
      let sourceResults = grouped.get(source);
      if (sourceResults === undefined) {
        sourceResults = [];
        grouped.set(source, sourceResults);
      }
      sourceResults.push(result);
    });

    return Array.from(grouped.keys()).map((source: SearchSource) => {
      return {source, results: grouped.get(source)};
    });
  }
}
