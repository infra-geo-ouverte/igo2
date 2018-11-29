import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
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

    /*return of({
      'messages': [],
      'donnees': [
        {
          'type': 'Feature',
          'geometry': {
            'coordinates': [[
              [-71.5015650292556, 46.6871529332646],
              [-71.5201094323364, 46.6993587124808],
              [-71.3596792615633, 46.7258684739835],
              [-71.3288723623501, 46.7398961305031],
              [-71.2667310425794, 46.7524233605592],
              [-71.2106174032893, 46.7884507109446],
              [-71.187646832096, 46.8251051713812],
              [-71.1945674826781, 46.8301817448566],
              [-71.1725514468664, 46.8425644274137],
              [-71.0788561392011, 46.8391390146242],
              [-70.994436599251, 46.7791328786739],
              [-71.0337057025594, 46.7601748942424],
              [-71.0089336842133, 46.7425513753238],
              [-71.0407223111029, 46.7356557942682],
              [-71.0652986252174, 46.7448110283047],
              [-71.1408109638386, 46.707932979165],
              [-71.1394490985589, 46.7032429119232],
              [-71.1332572294566, 46.7075058673306],
              [-71.1367253141593, 46.6817967795947],
              [-71.1277583249425, 46.6819957893385],
              [-71.127909517793, 46.6692155364291],
              [-71.214768698151, 46.6076438339753],
              [-71.2235285530578, 46.651669584468],
              [-71.2381236807042, 46.6421478376964],
              [-71.236419261993, 46.6176999360373],
              [-71.254267585524, 46.6299069041872],
              [-71.3321320354796, 46.5730145716605],
              [-71.409553539168, 46.6257336702861],
              [-71.403231566118, 46.62829481389],
              [-71.4198727346531, 46.6392780184105],
              [-71.4275874307534, 46.6366195989373],
              [-71.5015650292556, 46.6871529332646]
            ]],
            'type': 'Polygon',
          },
          'properties': {
            'id': '100',
            'diagramme': '1'
          },
          'meta': {
            'idProperty': 'properties.id'
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'coordinates': [[
              [-71.5015650292556, 46.6871529332646],
              [-71.5201094323364, 46.6993587124808],
              [-71.3596792615633, 46.7258684739835],
              [-71.3288723623501, 46.7398961305031],
              [-71.403231566118, 46.62829481389],
              [-71.4198727346531, 46.6392780184105],
              [-71.4275874307534, 46.6366195989373],
              [-71.5015650292556, 46.6871529332646]
            ]],
            'type': 'Polygon',
          },
          'properties': {
            'id': '101',
            'diagramme': '2'
          },
          'meta': {
            'idProperty': 'properties.id'
          }
        }
      ]
    }).pipe(
      map((response: ClientParcelListResponse) => {
        return this.extractParcelsFromResponse(response);
      })
    );*/

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
