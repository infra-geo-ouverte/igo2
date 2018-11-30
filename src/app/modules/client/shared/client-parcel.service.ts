import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/modules/core/api';
import {
  ClientParcel,
  ClientApiConfig,
  ClientParcelListResponse,
  ClientParcelListResponseItem
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
    const url = this.apiService.buildUrl(this.apiConfig.parcel.list, {
      clientNum,
      annee: '2018'
    });

    return this.http
      .get(url)
      .pipe(
        map((response: ClientParcelListResponse) => {
          return this.extractParcelsFromListResponse(response, clientNum);
        })
      );
  }

  private extractParcelsFromListResponse(
    response: ClientParcelListResponse,
    clientNum: string
  ): ClientParcel[] {
    return response.map(listItem => this.listItemToParcel(listItem, clientNum));
  }

  private listItemToParcel(
    listItem: ClientParcelListResponseItem,
    clientNum: string
  ): ClientParcel {
    const properties = Object.assign({}, listItem.properties, {
      noClientRecherche: clientNum
    });
    return {
      meta: {
        idProperty: 'properties.idParcelle',
        titleProperty: 'properties.idParcelle'
      },
      type: listItem.type,
      projection: 'EPSG:4326',
      geometry: listItem.geometry,
      extent: undefined,
      properties
    };
  }
}
