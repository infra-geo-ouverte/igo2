import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SearchSourceService } from './search-source.service';
import { SearchResult } from '../search/shared/search-result.interface';
import { SearchSource } from '../search/sources/search-source';

import { AppStore } from '../app.store';

@Injectable()
export class SearchService {

  subscriptions: Subscription[] = [];

  constructor(private store: Store<AppStore>,
              private searchSourceService: SearchSourceService) {
  }

  search(term?: string) {
    const sources = this.searchSourceService.getSources();

    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe);
    this.subscriptions = sources.map((source: SearchSource) =>
      this.searchSource(source, term));
  }

  searchSource(source: SearchSource, term?: string) {
    return source.search(term)
      .catch(this.handleError)
      .subscribe((results: SearchResult[]) =>
        this.handleSearchResults(results, source));
  }

  clear(term?: string) {
    this.store.dispatch({type: 'CLEAR_SEARCH_RESULTS'});
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

  private handleError(error: Response | any) {
    // TODO: use a remote logging infrastructure
    let errorMessage: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errorMessage = `
        ${error.status} -
        ${error.statusText || ''}
        ${err || ''}`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }

    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }

}
