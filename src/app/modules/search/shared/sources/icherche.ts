import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { removeKeys } from '../../../utils/object';
import { Entity } from '../../../entity/shared/entity.interface';
import { FEATURE } from '../../../feature/shared/feature.enum';
import { Feature } from '../../../feature/shared/feature.interface';
import { SearchSource, TextSearch, ReverseSearch } from './source';
import { SearchSourceOptions } from './source.interface';
import {
  IChercheResult,
  IChercheResponse,
  IChercheReverseResult,
  IChercheReverseResponse
} from './icherche.interface';

export class IChercheSearchSourceBase extends SearchSource  {

  constructor(protected options: SearchSourceOptions, protected http: HttpClient) {
    super();
    this.initOptions(options);
  }

  getDefaultOptions(): SearchSourceOptions {
    return {
      title: 'ICherche Québec'
    };
  }
}

@Injectable()
export class IChercheSearchSource
    extends IChercheSearchSourceBase implements TextSearch {

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

  getId(): string {
    return IChercheSearchSource.id;
  }

  getDefaultOptions(): SearchSourceOptions {
    return Object.assign(super.getDefaultOptions(), {
      searchUrl: 'https://geoegl.msp.gouv.qc.ca/icherche/geocode'
    });
  }

  search(term: string): Observable<Entity<Feature>[]> {
    const params = this.computeRequestParams(term);
    return this.http
      .get(this.searchUrl, { params })
      .pipe(
        map((response: IChercheResponse) => this.extractEntities(response))
      );
  }

  private computeRequestParams(term: string): HttpParams {
    return new HttpParams({
      fromObject: Object.assign({
        q: term,
        geometrie: 'geom',
        type: 'adresse,code_postal,route,municipalite,mrc,region_administrative'
      }, this.params)
    });
  }

  private extractEntities(response: IChercheResponse): Entity<Feature>[] {
    return response.features.map(result => this.resultToEntity(result));
  }

  private resultToEntity(result: IChercheResult): Entity<Feature> {
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

@Injectable()
export class IChercheReverseSearchSource
    extends IChercheSearchSourceBase implements ReverseSearch {

  static id = 'icherchereverse';
  static propertiesBlacklist: Array<string> = ['doc_type'];

  getId(): string {
    return IChercheReverseSearchSource.id;
  }

  getDefaultOptions(): SearchSourceOptions {
    return Object.assign(super.getDefaultOptions(), {
      searchUrl: 'https://geoegl.msp.gouv.qc.ca/icherche/xy'
    });
  }

  reverseSearch(lonLat: [number, number], distance?: number): Observable<Entity<Feature>[]> {
    const params = this.computeRequestParams(lonLat, distance);
    return this.http
      .get(this.searchUrl, { params })
      .pipe(
        map((response: IChercheReverseResponse) =>
          this.extractEntities(response))
      );
  }

  private computeRequestParams(lonLat: [number, number], distance?: number): HttpParams {
    return new HttpParams({
      fromObject: Object.assign({
        loc: lonLat.join(','),
        distance: distance ? String(distance) : '',
        geometries: 'geom',
        type: 'adresse,municipalite,mrc,regadmin'
      }, this.params)
    });
  }

  private extractEntities(response: IChercheReverseResponse): Entity<Feature>[] {
    return response.features.map(result => this.resultToEntity(result));
  }

  private resultToEntity(result: IChercheReverseResult): Entity<Feature> {
    const properties = this.computeProperties(result);
    const extent = this.computeExtent(result);

    return {
      rid: [this.getId(), properties.type, result._id].join('.'),
      provider: this,
      meta: {
        dataType: FEATURE,
        id: result._id,
        title: result.properties.nom,
        icon: 'place'
      },
      data: {
        type: FEATURE,
        projection: 'EPSG:4326',
        geometry: result.geometry,
        extent: extent,
        properties: properties
      }
    };
  }

  private computeProperties(result: IChercheReverseResult): { [key: string]: any } {
    const properties = removeKeys(
      result.properties,
      IChercheReverseSearchSource.propertiesBlacklist
    );
    return Object.assign(properties, {type: result.properties.doc_type});
  }

  private computeExtent(result: IChercheReverseResult): [number, number, number, number] {
    return [
      result.bbox[0],
      result.bbox[2],
      result.bbox[1],
      result.bbox[3]
    ];
  }
}
