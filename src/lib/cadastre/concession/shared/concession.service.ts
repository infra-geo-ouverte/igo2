import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';
import {
  ConcessionResponseItem,
  ConcessionApiConfig,
  ConcessionListResponse,
  ConcessionFeature,
  ConcessionUniqueList,
  ConcessionList,
  ConcessionUnique,
  Concession,
  ConcessionFeatureResponseItem,
  ConcessionFeatureListResponse
} from 'src/lib/cadastre/concession/shared/concession.interfaces';

@Injectable()
export class CadastreConcessionService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('concessionApiConfig') private apiConfig: ConcessionApiConfig
  ) {}

  /**
   * Get concession from service
   * @returns Observable of concession
   */
  getConcessions(idCadastreOriginaire: number): Observable<ConcessionUnique[]> {

    const url = this.apiService.buildUrl(this.apiConfig.list);

    return this.http
      .post(url, {lstIdCadastreOriginaire: [idCadastreOriginaire]})
      .pipe(
        map((response: ConcessionListResponse) => {
          return this.convertResponseToListConcessionUnique(response);
        })
      );
  }

  private convertResponseToListConcessionUnique(response: ConcessionListResponse): ConcessionUniqueList {

    const concessionUniqueList: ConcessionUniqueList = [];
    response.data.map((item: ConcessionResponseItem) => {

      const idConcessionItem: string = item.noCadastre + ' - ' + item.nomDesignationSecondaire;
      const concessionUniqueFind: ConcessionUnique = concessionUniqueList.find(
        x => x.idConcession === idConcessionItem );

      if (concessionUniqueFind === undefined) {
        concessionUniqueList.push({
          idConcession: idConcessionItem,
          nomConcession: item.nomDesignationSecondaire,
          noCadastre: item.noCadastre,
          listeIdConcession: [item.idDesignationSecondaire]});
      } else {
        concessionUniqueFind.listeIdConcession.push(item.idDesignationSecondaire);
      }
    });

    return concessionUniqueList;
  }

  getConcessionFeatureByNum(listConcession: string[]): Observable<ConcessionFeature[]> {

    const url = this.apiService.buildUrl(this.apiConfig.points);


    return this.http
      .post(url, { lstIdDesignationSecondaire: listConcession })
      .pipe(
        map((response: ConcessionFeatureListResponse) => {
          return this.extractConcessionsFromListResponse(response);
        })
      );
  }

  /**
   * Extract all concessions in a list from the response service
   * @param MunListResponse response
   * @returns List of municipalities
   */
  private extractConcessionsFromListResponse(
    response: ConcessionFeatureListResponse
  ): ConcessionFeatureResponseItem[] {
    return response.data.map(item => this.listItemToConcessionFeatures(item));
  }

  private listItemToConcessionFeatures(
    response: ConcessionFeatureResponseItem
  ): ConcessionFeature {
    const properties = Object.assign({}, response.properties);

    return {
      meta: {
        id: properties.idDesignationSecondaire,
        mapTitle: properties.nomDesignationSecondaire
      },
      type: response.type,
      projection: 'EPSG:4326',
      geometry: response.geometry,
      extent: undefined,
      properties
    };
  }

}
