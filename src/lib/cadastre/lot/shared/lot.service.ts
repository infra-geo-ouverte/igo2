import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';
import {
  LotResponseItem,
  LotApiConfig,
  LotListResponse,
  LotFeature,
  LotUniqueList,
  LotList,
  LotUnique,
  Lot,
  LotFeatureResponseItem,
  LotFeatureListResponse
} from './lot.interfaces';

@Injectable()
export class CadastreLotService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('lotApiConfig') private apiConfig: LotApiConfig
  ) {}

  /**
   * Get lot from service
   * @returns Observable of lot
   */
  getLots(idCadastreOriginaire: number): Observable<LotUnique[]> {

    const url = this.apiService.buildUrl(this.apiConfig.list);

    return this.http
      .post(url, {lstIdCadastreOriginaire: [idCadastreOriginaire]})
      .pipe(
        map((response: LotListResponse) => {
          return this.convertResponseToListLotUnique(response);
        })
      );
  }

  private convertResponseToListLotUnique(response: LotListResponse): LotUniqueList {

    const lotUniqueList: LotUniqueList = [];
    response.data.forEach((item: LotResponseItem) => {

      const idLotItem = item.noCadastre + ' - ' + item.noLotOriginaire;
      if (lotUniqueList.find(x => x.idLot === idLotItem ) === undefined) {
        lotUniqueList.push({
          idLot: item.noCadastre + ' - ' + item.noLotOriginaire,
          noLot: item.noLotOriginaire,
          noCadastre: item.noCadastre,
          listeIdLot: [item.idLotOriginaire]});
      } else {
        lotUniqueList.find(x => x.noCadastre === item.noCadastre && x.noLot === item.noLotOriginaire )
        .listeIdLot.push(item.idLotOriginaire);
      }
    });

    return lotUniqueList;
  }

  getLotFeatureByNum(listLot: string[]): Observable<LotFeature[]> {

    const url = this.apiService.buildUrl(this.apiConfig.points);


    return this.http
      .post(url, { lstIdLotSecondaire: listLot })
      .pipe(
        map((response: LotFeatureListResponse) => {
          return this.extractLotsFromListResponse(response);
        })
      );
  }

  /**
   * Extract all lots in a list from the response service
   * @param MunListResponse response
   * @returns List of municipalities
   */
  private extractLotsFromListResponse(
    response: LotFeatureListResponse
  ): LotFeatureResponseItem[] {
    return response.data.map(item => this.listItemToLotFeatures(item));
  }

  private listItemToLotFeatures(
    response: LotFeatureResponseItem
  ): LotFeature {
    const properties = Object.assign({}, response.properties);

    return {
      meta: {
        id: properties.idLotOriginaire,
        mapTitle: properties.noLotOriginaire
      },
      type: response.type,
      projection: 'EPSG:4326',
      geometry: response.geometry,
      extent: undefined,
      properties
    };
  }

}
