import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';
import {
  ClientParcel,
  ClientParcelApiConfig,
  ClientParcelListResponse,
  ClientParcelListResponseItem
} from './client-parcel.interfaces';

@Injectable()
export class ClientParcelService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('clientParcelApiConfig') private apiConfig: ClientParcelApiConfig
  ) {}

  getClientParcelsByNum(clientNum: string, annee: number = 2018): Observable<ClientParcel[]> {
    const url = this.apiService.buildUrl(this.apiConfig.list, {
      clientNum,
      annee
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
      noClientRecherche: parseInt(clientNum, 10)
    });
    return {
      meta: {
        id: listItem.properties.id,
        mapTitle: listItem.properties.noParcelleAgricole
      },
      type: listItem.type,
      projection: 'EPSG:4326',
      geometry: listItem.geometry,
      extent: undefined,
      properties
    };
  }
}
