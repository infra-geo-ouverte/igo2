import { Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SearchSource } from './search-source';
import { SearchResult } from '../shared/search-result.interface';
import { SearchResultType, SearchResultFormat } from '../shared/search-result.enum';

export class SearchSourceLayer extends SearchSource {

  static name_: string = 'Layer';
  static searchUrl: string = '/layers/search';

  constructor(private jsonp: Jsonp) {
    super();
  }

  getName (): string {
    return SearchSourceLayer.name_;
  }

  search (term?: string): Observable<SearchResult[]>  {
    const search = this.getSearchParams(term);

    return this.jsonp
      .get(SearchSourceLayer.searchUrl, { search })
      .map(res => this.extractData(res));
  }

  private extractData (response: Response): SearchResult[] {
    return response.json().items.map(this.formatResult);
  }

  private getSearchParams (term: string): URLSearchParams {
    const search = new URLSearchParams();
    search.set('q', term);
    search.set('limit', '2');
    search.set('callback', 'JSONP_CALLBACK');

    return search;
  }

  private formatResult (result: any): SearchResult {
    return {
      id: result.id,
      source: SearchSourceLayer.name_,
      type: SearchResultType.Layer,
      format: SearchResultFormat.WMS,
      title: result.source.title,
      title_html: result.highlight.title,
      icon: result.source.type === 'Layer' ? 'layers' : 'map',
      projection: 'EPSG:4326',
      properties: result.source
    };
  }

}
