import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../../core/api';
import { Feature } from '../../feature/shared/feature.interfaces';
import { substituteProperties } from '../../utils/str';
import {
  Place,
  PlaceCategory,
  PlaceCollectionApi,
  PlaceFeatureApi,
  PlaceMapper,
} from './place.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  static defaultPlaceMapper: PlaceMapper = {
    idProperty: 'id',
    titleProperty: 'title'
  };

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
    const url = this.apiService.buildUrl(api.uri, {id: id});
    return this.http
      .get(url)
      .pipe(map(res => this.extractPlaceFeatureFromResponse(res, api)));
  }

  private extractPlacesFromResponse(response: Object, api: PlaceCollectionApi): Place[] {
    let data = response;
    if (response.hasOwnProperty('data')) {
      data = response['data'];
    }

    let results: Object[] = [];
    if (data instanceof Array) {
      results = data as Object[];
    } else if (api.resultsProperty !== undefined && data.hasOwnProperty(api.resultsProperty)) {
      results = data[api.resultsProperty];
    }

    const mapper = {
      idProperty: api.idProperty || PlaceService.defaultPlaceMapper.idProperty,
      titleProperty: api.titleProperty || PlaceService.defaultPlaceMapper.titleProperty,
      title: api.title
    };

    return results.map(result => {
      return this.formatPlaceResult(result, mapper);
    });
  }

  private formatPlaceResult(result: Object, mapper: PlaceMapper): Place {
    const id = String(result[mapper.idProperty]);
    const title = this.computeTitle(result, mapper) || id;
    return {
      id: id,
      title: title
    };
  }

  private extractPlaceFeatureFromResponse(response: Object, api: PlaceFeatureApi): Feature | undefined {
    if (Object.getOwnPropertyNames(response).length > 0) {
      return this.formatPlaceFeatureResult(response);
    }
    return;
  }

  private formatPlaceFeatureResult(result: Object): Feature {
    return Object.assign({projection: 'EPSG:4326'}, result) as Feature;
  }

  private computeTitle(result: Object, mapper: PlaceMapper): string | undefined {
    let title;
    if (mapper.titleProperty !== undefined) {
      title = result[mapper.titleProperty];
    }

    if (title === undefined && mapper.title !== undefined) {
      title = substituteProperties(mapper.title, result);
    }

    return title;
  }
}
