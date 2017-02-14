import { SearchSource } from '../search/sources/search-source';

export class SearchSourceService {

  constructor(private sources: SearchSource[]) { }

  getSources() {
    return this.sources;
  }
}
