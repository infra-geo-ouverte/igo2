import { Injectable } from '@angular/core';

import { stringToLonLat } from '../../map/shared/map.utils';
import { SearchSource } from './sources';
import { SearchSourceService } from './search-source.service';
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

    const lonLat = stringToLonLat(term);
    const sources = this.searchSourceService.getSources()
      .filter((source: SearchSource) => source.enabled);

    let researches;
    if (lonLat !== undefined) {
      researches = this.searchSourcesByLonLat(sources, lonLat);
    } else {
      researches = this.searchSources(sources, term);
    }

    return researches;
  }

  private searchSources(sources: Source[], term: string): Research[] {
    return sources.map((source: SearchSource) => {
      return {request: source.search(term), source};
    })
  }

  private searchSourcesByLonLat(sources: Source[], lonLat: [number, number]): Research[] {
    return sources.map((source: SearchSource) => {
      return {request: source.searchByLonLat(lonLat), source};
    })
  }

  private termIsValid(term: string) {
    return typeof term === 'string' && term !== '';
  }
}
