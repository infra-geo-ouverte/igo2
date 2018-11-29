import { SearchSource } from './sources';

export class SearchSourceService {

  constructor(private sources: SearchSource[]) {}

  getSources(): SearchSource[] {
    return this.sources;
  }

  getEnabledSources(): SearchSource[] {
    return this.getSources().filter((source: SearchSource) => source.enabled === true);
  }

  enableSourcesByType(type: string) {
    this.getSources().forEach((source: SearchSource) => {
      if ((source.constructor as typeof SearchSource).type === type) {
        source.enabled = true;
      } else {
        source.enabled = false;
      }
    });
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
