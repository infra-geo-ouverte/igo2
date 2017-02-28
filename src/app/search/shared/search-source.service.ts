import { SearchSource } from '../sources/search-source';

export class SearchSourceService {

  constructor(private sources: SearchSource[]) { }

  getSources() {
    return this.sources;
  }
}
