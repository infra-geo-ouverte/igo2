import { Response, URLSearchParams } from '@angular/http';

import { SearchSource } from '../search/sources/search-source';
import { SearchResult } from '../search/shared/search-result.interface';

export class SearchSourceService {

  constructor(private sources: SearchSource[]) { }

  getSources() {
    return this.sources;
  }
}
