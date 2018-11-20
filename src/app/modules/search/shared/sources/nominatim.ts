import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FEATURE } from '../../../feature/shared/feature.enum';
import { FeatureGeometry, Feature } from '../../../feature/shared/feature.interface';
import { SearchResult } from '../search.interface';
import { SearchSource, TextSearch } from './source';
import { SearchSourceOptions } from './source.interface';
import { NominatimData } from './nominatim.interface';

@Injectable()
export class NominatimSearchSource
    extends SearchSource implements TextSearch {

  static id = 'nominatim';
  static type = FEATURE;

  constructor(protected options: SearchSourceOptions, private http: HttpClient) {
    super();
    this.initOptions(options);
  }

  getId(): string {
    return NominatimSearchSource.id;
  }

  getDefaultOptions(): SearchSourceOptions {
    return {
      title: 'Nominatim (OSM)',
      searchUrl: 'https://nominatim.openstreetmap.org/search'
    };
  }

  search(term?: string): Observable<SearchResult<Feature>[]> {
    const params = this.computeSearchRequestParams(term);
    return this.http
      .get(this.searchUrl, { params })
      .pipe(
        map((response: NominatimData[]) => this.extractResults(response))
      );
  }

  private computeSearchRequestParams(term: string): HttpParams {
    return new HttpParams({
      fromObject: Object.assign({
        q: term,
        format: 'json'
      }, this.params)
    });
  }

  private extractResults(response: NominatimData[]): SearchResult<Feature>[] {
    return response.map((data: NominatimData) => this.dataToResult(data));
  }

  private dataToResult(data: NominatimData): SearchResult<Feature> {
    const properties = this.computeProperties(data);
    const geometry = this.computeGeometry(data);
    const extent = this.computeExtent(data);

    return {
      source: this,
      meta: {
        dataType: FEATURE,
        id: [this.getId(), 'place', data.place_id].join('.'),
        title: data.display_name,
        icon: 'place'
      },
      data: {
        type: FEATURE,
        projection: 'EPSG:4326',
        geometry: geometry,
        extent: extent,
        properties: properties
      }
    };
  }

  private computeProperties(data: NominatimData): { [key: string]: any } {
    return {
      display_name: data.display_name,
      place_id: data.place_id,
      osm_type: data.osm_type,
      class: data.class,
      type: data.type
    };
  }

  private computeGeometry(data: NominatimData): FeatureGeometry {
    return {
      type:  'Point',
      coordinates: [parseFloat(data.lon), parseFloat(data.lat)]
    };
  }

  private computeExtent(data: NominatimData): [number, number, number, number] {
    return [
      parseFloat(data.boundingbox[2]),
      parseFloat(data.boundingbox[0]),
      parseFloat(data.boundingbox[3]),
      parseFloat(data.boundingbox[1])
    ];
  }
}
