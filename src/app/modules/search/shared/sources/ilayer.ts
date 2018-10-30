import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LanguageService } from '@igo2/core';
import { AnyLayerOptions } from '@igo2/geo';

import { LAYER } from '../../../map/shared/map.enum';
import { LayerRecord } from '../../../map/shared/map.interface';
import {
  ILayerResult,
  ILayerResponse
} from './ilayer.interface';
import { SearchSource } from './source';
import { SearchSourceOptions } from './source.interface';

@Injectable()
export class ILayerSearchSource extends SearchSource {

  static id = 'ilayer';

  get title(): string {
    return this.languageService.translate.instant(this.options.title);
  }

  constructor(
    protected options: SearchSourceOptions,
    private http: HttpClient,
    private languageService: LanguageService
  ) {
    super();
    this.initOptions(options);
  }

  getId(): string {
    return ILayerSearchSource.id;
  }

  getDefaultOptions(): SearchSourceOptions {
    return {
      title: 'igo.geo.search.dataSources.name',
      searchUrl: 'https://geoegl.msp.gouv.qc.ca/igo2/api/layers/search'
    };
  }

  search(term?: string): Observable<LayerRecord[]> {
    const params = this.computeSearchRequestParams(term);
    return this.http
      .get(this.searchUrl, { params })
      .pipe(
        map((response: ILayerResponse) => this.extractRecords(response))
      );
  }

  private computeSearchRequestParams(term: string): HttpParams {
    return new HttpParams({
      fromObject: Object.assign({
        q: term
      }, this.params)
    });
  }

  private extractRecords(response: ILayerResponse): LayerRecord[] {
    return response.items.map(result => this.resultToRecord(result));
  }

  private resultToRecord(result: ILayerResult): LayerRecord {
    const properties = this.computeProperties(result);
    const layerOptions = this.computeLayerOptions(result);

    return {
      rid: [this.getId(), result.id].join('.'),
      provider: this,
      meta: {
        dataType: LAYER,
        id: result.id,
        title: result.source.title,
        titleHtml: result.highlight.title,
        icon: result.source.type === 'Layer' ? 'layers' : 'map'
      },
      data: {
        properties: properties,
        layer: layerOptions
      }
    };
  }

  private computeProperties(result: ILayerResult): { [key: string]: any } {
    return {
      id: result.id,
      title:  result.source.title,
      group: result.source.groupTitle,
      abstract: result.source.abstract,
      type: result.source.format,
      url: result.source.url
    };
  }

  private computeLayerOptions(result: ILayerResult): AnyLayerOptions {
    return {
      title: result.source.title,
      sourceOptions: {
        type: result.source.format,
        url: result.source.url,
        params: {
          layers: result.source.name
        }
      }
    };
  }
}
