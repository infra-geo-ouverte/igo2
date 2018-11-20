import { Injectable } from '@angular/core';

import { EntityStore } from '../../entity/shared/store';
import { SearchResult } from './search.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchStoreService {

  get store(): EntityStore<SearchResult> {
    return this._store;
  }
  private _store: EntityStore<SearchResult>;

  constructor() {
    this._store = new EntityStore<SearchResult>();
  }

}
