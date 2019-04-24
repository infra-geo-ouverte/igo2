import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import * as olFormat from 'ol/format';

import {
  FEATURE,
  GeoJSONGeometry,
  SearchResult,
  SearchSource,
  SearchSourceOptions,
  TextSearch
} from '@igo2/geo';

import { CadastreRenoFeature } from './cadastre-reno.interfaces';
import { CADASTRE_RENO } from './cadastre-reno.enums';

/**
 * Cadastre search source
 */
@Injectable()
export class CadastreRenoSearchSource extends SearchSource implements TextSearch {

  static id = 'cadastreReno';
  static type = CADASTRE_RENO;

  constructor(
    private http: HttpClient,
    @Inject('options') options: SearchSourceOptions
  ) {
    super(options);
  }

  getId(): string { return CadastreRenoSearchSource.id; }

  protected getDefaultOptions(): SearchSourceOptions {
    return {
      title: 'Cadastre rénové',
      searchUrl: 'https://carto.cptaq.gouv.qc.ca/php/find_lot_v1.php'
    };
  }

  private computeRequestParams(term: string): HttpParams {
    return new HttpParams({
      fromObject: Object.assign(
        {
          numero: term.replace(/;/g, ','),
          epsg: '4326'
        },
        this.params
      )
    });
  }

  /**
   * Search a cadastre by num
   * @param term Cadastre num
   * @returns Observable of <SearchResult<Cadastre>[]
   */
  search(term?: string): Observable<SearchResult<CadastreRenoFeature>[]> {
    const params = this.computeRequestParams(term);

    if (term.length < 7) { return of([]); }

    return this.http
    .get(this.searchUrl, {
      params,
      responseType: 'text'
    })
    .pipe(map((response: string) => this.extractResults(response)));
  }

  private extractResults(response: string): SearchResult<CadastreRenoFeature>[] {
    const textResults = response.split('<br />');
    return textResults
      .map((textResult: string) => this.dataToResult(textResult))
      .filter((result:  SearchResult<CadastreRenoFeature>) => result !== undefined);
  }

  private dataToResult(cadastre: string): SearchResult<CadastreRenoFeature> {
    const propertiesCadastre = cadastre.split(';');
    if (propertiesCadastre.length < 7) {
      return undefined;
    }

    return {
      source: this,
      data: {
        type: FEATURE,
        projection: 'EPSG:4326',
        geometry: this.convertWKTtoGeojson(propertiesCadastre[7]),
        extent: undefined,
        properties: {
          noCadastre: propertiesCadastre[0]
        },
        meta: {
          id: this.getId(),
          title: 'data.properties.recherche'
        }
      },
      meta: {
        dataType: FEATURE,
        id: propertiesCadastre[0],
        title: propertiesCadastre[0],
        icon: 'grid_on'
      }
    };
  }

  private convertWKTtoGeojson(wkt: string): GeoJSONGeometry {
    const olFormatWKT = new olFormat.WKT();
    const olFormatGeoJson = new olFormat.GeoJSON();
    const olGeometry = olFormatWKT.readGeometry(wkt);
    return olFormatGeoJson.writeGeometryObject(olGeometry);
  }
}
