import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/modules/core/api';
import {
  ClientSchema,
  ClientApiConfig,
  ClientSchemaListResponse,
  ClientSchemaListResult
} from './client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('apiConfig') private apiConfig: ClientApiConfig
  ) {}

  getClientSchemasByNum(clientNum: string): Observable<ClientSchema[]> {
    const url = this.apiService.buildUrl(this.apiConfig.info);
    const params = new HttpParams({
      fromObject: {
        body: [clientNum]
      }
    });

    return of({
      'messages': [],
      'donnees': [
        {
          'id': '10428',
          'numeroClient': '0007229',
          'type': 'CMP',
          'description': 'test',
          'annee': '2018',
          'etat': null
        },
        {
          'id': '10425',
          'numeroClient': '0007229',
          'type': 'EPA',
          'description': 'efgh',
          'annee': '2016',
          'etat': 'TRAITE'
        }
      ]
    }).pipe(
      map((response: ClientSchemaListResponse) => {
        return this.extractSchemasFromResponse(response);
      })
    );

    /*
    return this.http
      .post(url, { params })
      .pipe(
        map((response: ClientSchemaListResponse) => {
          return this.extractSchemasFromResponse(response);
        })
      );
    */
  }

  private extractSchemasFromResponse(response: ClientSchemaListResponse): ClientSchema[] {
    const results = response.donnees || [];
    return results.map(result => this.resultToSchema(result));
  }

  private resultToSchema(result: ClientSchemaListResult) {
    return Object.assign({
      meta: {
        title: `${result.id} - ${result.type} - ${result.annee}`
      }
    }, result);
  }
}
