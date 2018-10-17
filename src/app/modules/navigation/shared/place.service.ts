import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../../core/api';
import { Feature } from '@igo2/geo';

import {
  Place,
  PlaceCategory,
  PlaceCollectionApi,
  PlaceFeatureApi,
  PlaceMapper,
} from './place.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  static defaultPlaceMapper: PlaceMapper = {
    id: 'id',
    title: 'title'
  }

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  getPlacesByCategory(category: PlaceCategory): Observable<Place[]> {
    const api = category.collection;
    const url = this.apiService.buildUrl(api.uri);
    return this.http
      .get(url)
      .pipe(map(res => this.extractPlacesFromResponse(res, api)));
  }

  getPlaceFeatureByCategoryAndId(category: PlaceCategory, id: string): Observable<Feature> {
    const api = category.feature;
    const url = this.apiService.buildUrl(api.uri, {id: id})
    return this.http
      .get(url)
      .pipe(map(res => this.extractPlaceFeatureFromResponse(res, api)));
  }

  private extractPlacesFromResponse(response: Object, api: PlaceCollectionApi): Place[] {
    let data = response;
    if (response.hasOwnProperty('data')) {
      data = response['data'];
    }

    let results: Array<Object> = [];
    if (data instanceof Array) {
      results = data as Array<Object>;
    } else if (api.resultsProperty !== undefined && data.hasOwnProperty(api.resultsProperty)) {
      results = data[api.resultsProperty];
    }

    const mapper = {
      id: api.idProperty || PlaceService.defaultPlaceMapper.id,
      title: api.titleProperty || PlaceService.defaultPlaceMapper.id,
    }

    return results.map(result => {
      return this.formatPlaceResult(result, mapper);
    });
  }

  private formatPlaceResult(result: Object, mapper: PlaceMapper): Place {
    return {
      id: result[mapper.id],
      title: result[mapper.title]
    }
  }

  private extractPlaceFeatureFromResponse(response: Object, api: PlaceFeatureApi): Feature | null {
    if (Object.getOwnPropertyNames(response).length > 0) {
      return this.formatPlaceFeatureResult(response);
    }
    return null;
  }

  private formatPlaceFeatureResult(result: Object): Feature {
    return Object.assign({projection: 'EPSG:4326'}, result) as Feature;
  }
}
