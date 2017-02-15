import { Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SearchSource } from './search-source';
import { SearchResult } from '../shared/search-result.interface';

export class SearchSourceMSP extends SearchSource {

  static name_: string = 'MSP';
  static searchUrl: string = '/icherche/v1/geocodingMaxScore';

  constructor(private jsonp: Jsonp) {
    super();
  }

  getName (): string {
    return SearchSourceMSP.name_;
  }

  search (term?: string): Observable<SearchResult[]>  {
    const search = this.getSearchParams(term);

    return this.jsonp
      .get(SearchSourceMSP.searchUrl, { search })
      .map(res => this.extractData(res));
  }

  private extractData (response: Response): SearchResult[] {
    return response.json().hits.hits.map(this.formatResult);
  }

  private getSearchParams (term: string): URLSearchParams {
    const search = new URLSearchParams();
    search.set('q', term);
    search.set('nb', '5');
    search.set('callback', 'JSONP_CALLBACK');

    return search;
  }

  private formatResult (result: any): SearchResult {
    const _source = result._source;

    return {
      id: result._id,
      source: SearchSourceMSP.name_,
      title: _source.recherche,
      icon: 'place',
      properties: {
        recherche: _source.recherche,
        munnom: _source.munnom,
        odogene: _source.odogene
      },
      geometry: _source.geom,
      bbox: _source.extent.coordinates
    };
  }

}
