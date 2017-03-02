import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { RequestService } from '../../core/request.service';

import { SearchSourceService } from './search-source.service';
import { SearchResult } from './search-result.interface';
import { SearchSource } from '../sources/search-source';


@Injectable()
export class SearchService {

  subscriptions: Subscription[] = [];

  constructor(private store: Store<IgoStore>,
              private searchSourceService: SearchSourceService,
              private requestService: RequestService) {
  }

  search(term: string) {
    const sources = this.searchSourceService.getSources();

    this.unsubscribe();
    this.subscriptions = sources.map((source: SearchSource) =>
      this.searchSource(source, term));
  }

  searchSource(source: SearchSource, term?: string) {
    const request = source.search(term);

    return this.requestService.register(request)
      .subscribe((results: SearchResult[]) =>
        this.handleSearchResults(results, source));
  }

  clear() {
    this.unsubscribe();
    this.store.dispatch({type: 'CLEAR_SEARCH_RESULTS'});
  }

  private unsubscribe() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  private handleSearchResults(results: SearchResult[], source: SearchSource) {
    this.store.dispatch({
      type: 'UPDATE_SEARCH_RESULTS',
      payload: {
        results: results,
        source: source.getName()
      }
    });
  }
}
