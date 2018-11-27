import { Injectable } from '@angular/core';

import { EntityStore } from 'src/app/modules/entity';
import { SearchResult } from 'src/app/modules/search';

@Injectable({
  providedIn: 'root'
})
export class SearchState {

  get store(): EntityStore<SearchResult> {
    return this._store;
  }
  private _store: EntityStore<SearchResult>;

  constructor() {
    this._store = new EntityStore<SearchResult>();
  }

}
