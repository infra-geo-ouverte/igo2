import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import OlFormatWKT from 'ol/format/WKT';
import OlFormatGeoJSON from 'ol/format/GeoJSON';
import {
  FEATURE,
  SearchResult,
  SearchSource,
  SearchSourceOptions,
  TextSearch,
  FeatureGeometry
} from '@igo2/geo';
import { CadastreRenoFeature } from 'src/lib/cadastre-reno';
import { CADASTRE_RENO } from './cadastre-reno.enum';

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
    if (term.length < 7 ) { return of([]); }

    const params = this.computeRequestParams(term);

    return this.http
    .get(this.searchUrl, {
      params,
      responseType: 'text'
    })
    .pipe(map((response: string) => this.extractResults(response)));
  }

  private extractResults(response: string): SearchResult<CadastreRenoFeature>[] {

    const temp: string[] = response.split('<br />');
    const resultSearch: SearchResult<CadastreRenoFeature>[] = [];

    for (const cadastreRenoFeature of temp) {
      const searchResultCadastreRenov: SearchResult<CadastreRenoFeature> = this.dataToResult(cadastreRenoFeature);
      if (searchResultCadastreRenov !== undefined) {
        resultSearch.push(searchResultCadastreRenov);
      }
    }

    return resultSearch;
  }

  /**
   *Convert a string representation of a cadastre geometry in a SearchResult cadastre
   * @param string cadastre
   * @returns SearchResult<CadastreRenoFeature>
   */
  private dataToResult(cadastre: string): SearchResult<CadastreRenoFeature> {
    const propertiesCadastre = cadastre.split(';');
    if (propertiesCadastre[0] === undefined || propertiesCadastre[0] === '') { return; }
    const id = [this.getId(), propertiesCadastre[0]].join('.');
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
          id
        }
      },
      meta: {
        dataType: FEATURE,
        id,
        title: propertiesCadastre[0],
        icon: 'grid_on'
      }
    };
  }

  /**
   * Convert a WKT string to a GeoJSON Feature
   * @param string stringWkt
   * @returns FeatureGeometry
   */
  private convertWKTtoGeojson(stringWkt: string): FeatureGeometry {
    if (stringWkt === undefined) { return; }

    const  olFormatWKT = new OlFormatWKT;
    const  olFormatGeoJSON = new OlFormatGeoJSON;

    const featureWkt = olFormatWKT.readGeometry(stringWkt);

    const featureGeoJSON = olFormatGeoJSON.writeGeometryObject(featureWkt);

    return featureGeoJSON;
  }
}
