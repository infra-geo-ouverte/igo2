import { Injectable } from '@angular/core';

import { EntityStore } from 'src/app/modules/entity';
import { SearchResult, SearchSourceService, SearchSource } from 'src/app/modules/search';

@Injectable({
  providedIn: 'root'
})
export class SearchState {

  get searchTypes(): string[] {
    return this.searchSourceService.getEnabledSources()
      .map((source: SearchSource) => (source.constructor as any).type);
  }

  get store(): EntityStore<SearchResult> {
    return this._store;
  }
  private _store: EntityStore<SearchResult>;

  constructor(private searchSourceService: SearchSourceService) {
    this._store = new EntityStore<SearchResult>();
  }

}
