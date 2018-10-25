import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { removeKeys } from '../../../utils/object';
import { FEATURE } from '../../../feature/shared/feature.enum';
import {
  IChercheRecord,
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
    'cote'
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

  search(term?: string): Observable<IChercheRecord[]> {
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

  private extractRecords(response: IChercheResponse): IChercheRecord[] {
    return response.features.map(result => this.resultToRecord(result));
  }

  private resultToRecord(result: IChercheResult): IChercheRecord {
    const properties = this.computeProperties(result);

    return {
      id: result._id,
      rid: [this.getId(), properties.type, result._id].join('.'),
      provider: this,
      meta: {
        dataType: FEATURE,
        title: result.properties.recherche,
        titleHtml: result.highlight,
        icon: 'place'
      },
      data: {
        id: result._id,
        type: FEATURE,
        projection: 'EPSG:4326',
        properties: properties,
        geometry: result.geometry,
        extent: result.bbox
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
