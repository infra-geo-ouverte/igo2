import { Injectable } from '@angular/core';

import { stringToLonLat } from '../../map/shared/map.utils';
import {
  SearchSource,
  TextSearch,
  ReverseSearch
} from './sources';
import { SearchSourceService } from './search-source.service';
import { Research } from './search.interface';
import { sourceCanSearch, sourceCanReverseSearch } from './search.utils';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private searchSourceService: SearchSourceService) {}

  search(term: string): Research[] {
    if (!this.termIsValid(term)) {
      return [];
    }

    const lonLat = stringToLonLat(term);
    if (lonLat !== undefined) {
      return this.reverseSearch(lonLat);
    }

    const sources = this.searchSourceService.getSources()
      .filter((source: SearchSource) => {
        return source.enabled && sourceCanSearch(source);
      });
    return this.searchSources(sources, term);
  }

  reverseSearch(lonLat: [number, number]) {
    const sources = this.searchSourceService.getSources()
      .filter((source: SearchSource) => {
        return source.enabled && sourceCanReverseSearch(source);
      });
    return this.reverseSearchSources(sources, lonLat);
  }

  private searchSources(sources: SearchSource[], term: string): Research[] {
    return sources.map((source: SearchSource) => {
      return {
        request: (source as any as TextSearch).search(term),
        reverse: false,
        source
      };
    });
  }

  private reverseSearchSources(sources: SearchSource[], lonLat: [number, number]): Research[] {
    return sources.map((source: SearchSource) => {
      return {
        request: (source as any as ReverseSearch).reverseSearch(lonLat),
        reverse: true,
        source
      };
    });
  }

  private termIsValid(term: string) {
    return typeof term === 'string' && term !== '';
  }
}
