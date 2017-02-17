import { Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SearchSource } from './search-source';
import { SearchResult } from '../shared/search-result.interface';

export class SearchSourceMSP extends SearchSource {

  static name_: string = 'ICherche Québec';
  static searchUrl: string = '/icherche/geopasdecode';

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
    return response.json().features.map(this.formatResult);
  }

  private getSearchParams (term: string): URLSearchParams {
    const search = new URLSearchParams();
    search.set('q', term);
    search.set('limit', '5');
    search.set('callback', 'JSONP_CALLBACK');
    search.set('geometries', 'geom');

    return search;
  }

  private formatResult (result: any): SearchResult {
    return {
      id: result.id,
      source: SearchSourceMSP.name_,
      title: result.properties.recherche,
      title_html: result.highlight,
      icon: 'place',
      projection: 'EPSG:4326',
      properties: Object.assign({
        type: result.doc_type
      }, result.properties),
      geometry: result.geometry,
      extent: result.bbox
    };
  }

}
