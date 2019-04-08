import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import olFormat from 'ol/format';

import {
  SearchResult,
  SearchSource,
  SearchSourceOptions,
  TextSearch,
  Feature,
  FeatureGeometry
} from '@igo2/geo';

import { CadastreRenoFeature } from 'src/lib/cadastre-reno/shared/cadastre-reno.interfaces';
import { CADASTRE_RENO } from '../cadastre-reno.enum';
import { HttpClient, HttpParams } from '@angular/common/http';


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
          numero: term,
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

    if (term.length < 7) { return; }
    console.log('SEARCH < 7');
    return this.http
    .get(this.searchUrl, {
      params,
      responseType: 'text'
    })
    .pipe(map((response: string) => this.extractResults(response)));
  }

  private extractResults(response: string): SearchResult<CadastreRenoFeature>[] {
    console.log('RESPONSE: ' + response);

    const temp: string[] = response.split('<br />');
    const resultSearch: SearchResult<CadastreRenoFeature>[] = [];

    for (const cadastreRenoFeature of temp) {
      resultSearch.push(this.dataToResult(cadastreRenoFeature));
    }

    /*  .map((cadastre: string) => { this.dataToResult(cadastre); });*/
    // return [this.dataToResult(response)];

    return resultSearch;
  }

  private dataToResult(cadastre: string): SearchResult<CadastreRenoFeature> {
    const propertiesCadastre = cadastre.split(';');

    return {
      source: this,
      data: {
        type: CADASTRE_RENO,
        projection: 'EPSG:4326',
        geometry: this.convertWKTtoGeojson(propertiesCadastre[7]),
        extent: null,
        properties: null,
        meta: {
          id: this.getId(),
          title: 'data.properties.recherche'
        }
      },
      meta: {
        dataType: CADASTRE_RENO,
        id: propertiesCadastre[0],
        title: propertiesCadastre[0],
        icon: 'grid_on'
      }
    };
  }

  private convertWKTtoGeojson(featureWKT: string) {
    console.log('TEST:' + featureWKT);
    const  olFormatWKT = new olFormat.WKT();
    const  olFormatGeoJson = new olFormat.GeoJSON();

    // const wkt_format = new olFormat().Format.WKT();
    const feature = olFormatWKT.readFeature(featureWKT);
    // const wkt_options = {};
    // const geojson_format = new olFormat().Format.GeoJSON(wkt_options);

    return olFormatGeoJson().writeFeature(feature);

  }
}
