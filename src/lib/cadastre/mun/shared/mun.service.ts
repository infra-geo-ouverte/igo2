import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';
import {
  MunResponseItem,
  MunApiConfig,
  MunListResponse,
} from './mun.interfaces';

@Injectable()
export class CadastreMunService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('munApiConfig') private apiConfig: MunApiConfig
  ) {}

  /**
   * Get municipalities from service
   * @returns Observable of municipalities
   */
  getMuns(): Observable<MunResponseItem[]> {
    const url = this.apiService.buildUrl(this.apiConfig.list);

    return this.http
      .get(url)
      .pipe(
        map((response: MunListResponse) => {
          return this.extractMunFromListResponse(response);
        })
      );
  }

  /**
   * Extract all municipalities in a list from the response service
   * @param MunListResponse response
   * @returns List of municipalities
   */
  private extractMunFromListResponse(
    response: MunListResponse
  ): MunResponseItem[] {
    return response.data.map(item => this.listItemToMun(item));
  }

  /**
   * Convert a service response item in a MunNom interface
   * @param listItem An item of response municipality service
   */
   private listItemToMun(
    listItem: MunResponseItem
  ): MunResponseItem {
    return {
      codeGeographique: '' + listItem.codeGeographique,
      nomMunicipalite: listItem.nomMunicipalite,
      designationMunicipalite: listItem.designationMunicipalite,
      nomRegionAdmAppartenance: listItem.nomRegionAdmAppartenance
    };
  }
}
