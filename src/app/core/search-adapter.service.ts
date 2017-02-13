import { Response, URLSearchParams } from '@angular/http';

import { SearchAdapter } from '../search/adapters/search-adapter';
import { SearchResult } from '../search/shared/search-result.interface';

export class SearchAdapterService {

  constructor(private adapter: SearchAdapter) { }

  getSearchUrl (): string {
    return this.adapter.getSearchUrl();
  }

  extractData (response: Response): SearchResult[] {
    return this.adapter.extractData(response);
  }

  getSearchParams (term: string): URLSearchParams {
    return this.adapter.getSearchParams(term);
  }

}
