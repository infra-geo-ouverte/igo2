import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';

import { SearchAdapter } from './search-adapter';
import { SearchResult } from '../shared/search-result.interface';

export class SearchAdapterNominatim extends SearchAdapter {

  static searchUrl: string = 'http://nominatim.openstreetmap.org/search';

  constructor() {
    super();
  }

  getSearchUrl (): string {
    return SearchAdapterNominatim.searchUrl;
  }

  extractData (response: Response): SearchResult[] {
    return response.json().map(this.formatResult);
  }

  getSearchParams (term: string): URLSearchParams {
    const search = new URLSearchParams();
    search.set('q', term);
    search.set('format', 'json');

    return search;
  }

  private formatResult (result: any): SearchResult {
    return {
      id: result.place_id as string,
      title: result.display_name,
      icon: 'place'
    };
  }

}
