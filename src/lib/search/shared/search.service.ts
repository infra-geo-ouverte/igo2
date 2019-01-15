import { Injectable } from '@angular/core';

import { stringToLonLat } from 'src/lib/map';

import {
  SearchSource,
  TextSearch,
  ReverseSearch
} from './sources';
import { SearchSourceService } from './search-source.service';
import { Research } from './search.interfaces';
import { sourceCanSearch, sourceCanReverseSearch } from './search.utils';

/**
 * This service perform researches in all the search sources enabled.
 * It returns Research objects who's 'request' property needs to be
 * subscribed to in order to trigger the research. This services has
 * keeps internal state of the researches it performed
 * and the results they yielded.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private searchSourceService: SearchSourceService) {}

  /**
   * Perform a research by text
   * @param term Any text
   * @returns Researches
   */
  search(term: string): Research[] {
    if (!this.termIsValid(term)) {
      return [];
    }

    const lonLat = stringToLonLat(term);
    if (lonLat !== undefined) {
      return this.reverseSearch(lonLat);
    }

    const sources = this.searchSourceService.getEnabledSources()
      .filter(sourceCanSearch);
    return this.searchSources(sources, term);
  }

  /**
   * Perform a research by lon/lat
   * @param lonLat Any lon/lat coordinates
   * @returns Researches
   */
  reverseSearch(lonLat: [number, number]) {
    const sources = this.searchSourceService.getEnabledSources()
      .filter(sourceCanReverseSearch);
    return this.reverseSearchSources(sources, lonLat);
  }

  /**
   * Create a text research out of all given search sources
   * @param sources Search sources that implement TextSearch
   * @param term Search term
   * @returns Observable of Researches
   */
  private searchSources(sources: SearchSource[], term: string): Research[] {
    return sources.map((source: SearchSource) => {
      return {
        request: (source as any as TextSearch).search(term),
        reverse: false,
        source
      };
    });
  }

  /**
   * Create a reverse research out of all given search sources
   * @param sources Search sources that implement ReverseSearch
   * @param lonLat Any lon/lat coordinates
   * @returns Observable of Researches
   */
  private reverseSearchSources(sources: SearchSource[], lonLat: [number, number]): Research[] {
    return sources.map((source: SearchSource) => {
      return {
        request: (source as any as ReverseSearch).reverseSearch(lonLat),
        reverse: true,
        source
      };
    });
  }

  /**
   * Validate that a search term is valid
   * @param term Search term
   * @returns True if the search term is valid
   */
  private termIsValid(term: string): boolean {
    return typeof term === 'string' && term !== '';
  }
}
