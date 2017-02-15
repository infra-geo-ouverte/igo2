import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SearchSource } from './search-source';
import { SearchResult } from '../shared/search-result.interface';

export class SearchSourceNominatim extends SearchSource {

  static name_: string = 'Nominatim';
  static searchUrl: string = 'http://nominatim.openstreetmap.org/search';

  constructor(private http: Http) {
    super();
  }

  getName (): string {
    return SearchSourceNominatim.name_;
  }

  search (term?: string): Observable<SearchResult[]>  {
    const search = this.getSearchParams(term);

    return this.http
      .get(SearchSourceNominatim.searchUrl, { search })
      .map(res => this.extractData(res));
  }

  private extractData (response: Response): SearchResult[] {
    return response.json().map(this.formatResult);
  }

  private getSearchParams (term: string): URLSearchParams {
    const search = new URLSearchParams();
    search.set('q', term);
    search.set('format', 'json');
    search.set('limit', '5');

    return search;
  }

  private formatResult (result: any): SearchResult {
    return {
      id: result.place_id,
      source: SearchSourceNominatim.name_,
      title: result.display_name,
      icon: 'place',
      properties: {
        name: result.display_name,
        place_id: result.place_id,
        osm_type: result.osm_type,
        class: result.class,
        type: result.type
      },
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(result.lon),
          parseFloat(result.lat)
        ]
      },
      bbox: [
        parseFloat(result.boundingbox[2]),
        parseFloat(result.boundingbox[0]),
        parseFloat(result.boundingbox[3]),
        parseFloat(result.boundingbox[1])
      ]
    };
  }

}
