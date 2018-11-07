import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Record } from '../../../data/shared/data.interface';
import { FEATURE } from '../../../feature/shared/feature.enum';
import {
  FeatureGeometry,
  Feature
} from '../../../feature/shared/feature.interface';
import { SearchSource, Searchable, ReverseSearchable } from './source';
import { SearchSourceOptions } from './source.interface';
import { NominatimResult } from './nominatim.interface';

@Injectable()
export class NominatimSearchSource
    extends SearchSource implements Searchable {

  static id = 'nominatim';

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

  search(term?: string): Observable<Record<Feature>[]> {
    const params = this.computeSearchRequestParams(term);
    return this.http
      .get(this.searchUrl, { params })
      .pipe(
        map((response: Array<NominatimResult>) => this.extractRecords(response))
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

  private extractRecords(response: Array<NominatimResult>): Record<Feature>[] {
    return response.map(result => this.resultToRecord(result));
  }

  private resultToRecord(result: NominatimResult): Record<Feature> {
    const properties = this.computeProperties(result);
    const geometry = this.computeGeometry(result);
    const extent = this.computeExtent(result);

    return {
      rid: [this.getId(), 'place', result.place_id].join('.'),
      provider: this,
      meta: {
        dataType: FEATURE,
        id: result.place_id,
        title: result.display_name,
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

  private computeProperties(result: NominatimResult): { [key: string]: any } {
    return {
      display_name: result.display_name,
      place_id: result.place_id,
      osm_type: result.osm_type,
      class: result.class,
      type: result.type
    };
  }

  private computeGeometry(result: NominatimResult): FeatureGeometry {
    return {
      type:  'Point',
      coordinates: [parseFloat(result.lon), parseFloat(result.lat)]
    };
  }

  private computeExtent(result: NominatimResult): [number, number, number, number] {
    return [
      parseFloat(result.boundingbox[2]),
      parseFloat(result.boundingbox[0]),
      parseFloat(result.boundingbox[3]),
      parseFloat(result.boundingbox[1])
    ];
  }
}
