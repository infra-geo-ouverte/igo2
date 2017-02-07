import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { SearchAdapterService } from './search-adapter.service';

import { AppStore } from '../app.store';

@Injectable()
export class SearchService {

  constructor(private http: Http,
              private store: Store<AppStore>,
              private searchAdapterService: SearchAdapterService) {
  }

  search (term?: string) {
    const search = this.searchAdapterService.getSearchParams(term);

    this.http
      .get(this.searchAdapterService.getSearchUrl(), { search })
      .map(res => this.searchAdapterService.extractData(res))
      .catch(this.handleError)
      .subscribe(
        results => {
        this.store.dispatch({
          type: 'SET_SEARCH_RESULTS',
          payload: {
            results: results,
            count: results.length
          }
        });
      });
  }

  clear (term?: string) {
    this.store.dispatch({type: 'CLEAR_SEARCH_RESULTS'});
  }

  private handleError (error: Response | any) {
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
