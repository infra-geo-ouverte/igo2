import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { removeKeys } from '../../../utils/object';
import { Record } from '../../../data/shared/data.interface';
import { FEATURE } from '../../../feature/shared/feature.enum';
import { Feature } from '../../../feature/shared/feature.interface';
import {
  IChercheResult,
  IChercheResponse
} from './icherche.interface';
import { SearchSource } from './source';
import { SearchSourceOptions } from './source.interface';

@Injectable()
export class IChercheSearchSource extends SearchSource {

  static id = 'icherche';
  static propertiesBlacklist: Array<string> = [
    '@timestamp',
    '@version',
    'recherche',
    'id',
    'cote',
    'geometry',
    'bbox'
  ];

  constructor(protected options: SearchSourceOptions, private http: HttpClient) {
    super();
    this.initOptions(options);
  }

  getId(): string {
    return IChercheSearchSource.id;
  }

  getDefaultOptions(): SearchSourceOptions {
    return {
      title: 'ICherche Québec',
      searchUrl: 'https://geoegl.msp.gouv.qc.ca/icherche/geocode'
    };
  }

  search(term?: string): Observable<Record<Feature>[]> {
    const params = this.computeSearchRequestParams(term);
    return this.http
      .get(this.searchUrl, { params })
      .pipe(
        map((response: IChercheResponse) => this.extractRecords(response))
      );
  }

  private computeSearchRequestParams(term: string): HttpParams {
    return new HttpParams({
      fromObject: Object.assign({
        q: term
      }, this.params)
    });
  }

  private extractRecords(response: IChercheResponse): Record<Feature>[] {
    return response.features.map(result => this.resultToRecord(result));
  }

  private resultToRecord(result: IChercheResult): Record<Feature> {
    const properties = this.computeProperties(result);

    return {
      rid: [this.getId(), properties.type, result._id].join('.'),
      provider: this,
      meta: {
        dataType: FEATURE,
        id: result._id,
        title: result.properties.recherche,
        titleHtml: result.highlight,
        icon: 'place'
      },
      data: {
        type: FEATURE,
        projection: 'EPSG:4326',
        geometry: result.geometry,
        extent: result.bbox,
        properties: properties
      }
    };
  }

  private computeProperties(result: IChercheResult): { [key: string]: any } {
    const properties = removeKeys(
      result.properties,
      IChercheSearchSource.propertiesBlacklist
    );
    return Object.assign(properties, {type: result.doc_type});
  }
}
