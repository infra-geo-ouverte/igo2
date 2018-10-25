import { SearchSource } from './sources';

export class SearchSourceService {

  constructor(private sources: SearchSource[]) {}

  getSources() {
    return this.sources;
  }

  getSourceById(id: String): SearchSource | undefined {
    return this.sources.find(source => source.getId() === id);
  }

  enableSourceById(id: string, exclusive: Boolean = false) {
    if (exclusive === true) {
      this.disableAllSources();
    }

    const source = this.getSourceById(id);
    if (source !== undefined) {
      source.enabled = true;
    }
  }

  enableAllSources() {
    this.sources.forEach(source => source.enabled = true);
  }

  disableAllSources() {
    this.sources.forEach(source => source.enabled = false);
  }

}

export function searchSourceServiceFactory(sources: SearchSource[]) {
  return new SearchSourceService(sources);
}

export function provideSearchSourceService() {
  return {
    provide: SearchSourceService,
    useFactory: searchSourceServiceFactory,
    deps: [SearchSource]
  };
}
