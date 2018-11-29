import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/modules/core/api';
import {
  ClientParcel,
  ClientApiConfig,
  ClientParcelListResponse,
  ClientParcelListResult
} from './client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientParcelService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('apiConfig') private apiConfig: ClientApiConfig
  ) {}

  getClientParcelsByNum(clientNum: string): Observable<ClientParcel[]> {
    const url = this.apiService.buildUrl(this.apiConfig.parcels, {
      clientNum,
      annee: '2018'
    });

    return this.http
      .get(url)
      .pipe(
        map((response: ClientParcelListResponse) => {
          return this.extractParcelsFromResponse(response, clientNum);
        })
      );
  }

  private extractParcelsFromResponse(response: ClientParcelListResponse, clientNum: string): ClientParcel[] {
    return response.map(result => this.resultToParcel(result, clientNum));
  }

  private resultToParcel(result: ClientParcelListResult, clientNum: string): ClientParcel {
    const properties = Object.assign({}, result.properties, {
      noClientRecherche: clientNum
    });
    return {
      meta: {
        idProperty: 'properties.idParcelle',
        titleProperty: 'properties.idParcelle'
      },
      type: result.type,
      projection: 'EPSG:4326',
      geometry: result.geometry,
      extent: undefined,
      properties
    };
  }
}
