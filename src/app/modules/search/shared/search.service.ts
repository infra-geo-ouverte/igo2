import { Injectable } from '@angular/core';

import { SearchSource, SearchSourceService } from '@igo2/geo';
import { Research } from './search.interface';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private searchSourceService: SearchSourceService) {}

  search(term: string): Research[] {
    if (!this.termIsValid(term)) {
      return [];
    }

    return this.searchSourceService.getSources()
      .filter((source: SearchSource) => source.enabled)
      .map((source: SearchSource) => this.searchSource(source, term));
  }

  private searchSource(source: SearchSource, term: string): Research {
    return {request: source.search(term), source}
  }

  private termIsValid(term: string) {
    return typeof term === 'string' && term !== '';
  }
}
