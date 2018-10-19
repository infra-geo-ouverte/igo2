import { SearchSource } from './sources';

export class SearchSourceService {

  constructor(private sources: SearchSource[]) {}

  getSources() {
    return this.sources;
  }

  getSourceByName(name: String): SearchSource | undefined {
    return this.sources.find(source => source.getName() === name);
  }

  getSourcesByType(type: String): SearchSource[] {
    return this.sources.filter(source => source.getType() === type);
  }

  enableSourceByName(name: string, exclusive: Boolean = false) {
    if (exclusive === true) {
      this.disableAllSources();
    }
  
    const source = this.getSourceByName(name);
    if (source !== undefined) {
      source.enabled = true;
    } 
  }

  enableSourcesByType(type: string, exclusive: Boolean = false) {
    if (exclusive === true) {
      this.disableAllSources();
    }
  
    const sources = this.getSourcesByType(type);
    sources.forEach(source => source.enabled = true);
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
