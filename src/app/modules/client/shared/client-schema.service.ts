import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/modules/core/api';
import {
  ClientSchema,
  ClientApiConfig,
  ClientSchemaListResponse,
  ClientSchemaListResponseItem,
  ClientSchemaCreateData,
  ClientSchemaCreateResponse,
  ClientSchemaUpdateData,
  ClientSchemaUpdateResponse
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
        return this.extractSchemasFromListResponse(response);
      })
    );

    /*
    const url = this.apiService.buildUrl(this.apiConfig.schema.list, {clientNum});
    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaListResponse) => {
          return this.extractSchemasFromListResponse(response);
        })
      );
    */
  }

  createSchema(data: ClientSchemaCreateData): Observable<ClientSchema> {
    const url = this.apiService.buildUrl(this.apiConfig.schema.create);
    const params = new HttpParams({
      fromObject: data as { [key: string]: any}
    });

    return this.http
      .post(url, {params})
      .pipe(
        map((response: ClientSchemaCreateResponse) => {
          return this.extractSchemaFromCreateResponse(response);
        })
      );
  }

  updateSchema(schema: ClientSchema, data: ClientSchemaUpdateData): Observable<ClientSchema> {
    const url = this.apiService.buildUrl(this.apiConfig.schema.update);
    const params = new HttpParams({
      fromObject: data as { [key: string]: any}
    });

    return this.http
      .post(url, {params})
      .pipe(
        map((response: ClientSchemaUpdateResponse) => {
          return this.extractSchemaFromUpdateResponse(response);
        })
      );
  }

  private extractSchemasFromListResponse(
    response: ClientSchemaListResponse
  ): ClientSchema[] {
    const listItems = response.donnees || [];
    return listItems.map(listItem => this.listItemToSchema(listItem));
  }

  private listItemToSchema(listItem: ClientSchemaListResponseItem) {
    return Object.assign({
      meta: {
        title: `${listItem.id} - ${listItem.type} - ${listItem.annee}`
      }
    }, listItem);
  }

  private extractSchemaFromCreateResponse(
    response: ClientSchemaCreateResponse
  ): ClientSchema {
    return Object.assign({
      meta: {
        title: `${response.id} - ${response.type} - ${response.annee}`
      }
    }, response);
  }

  private extractSchemaFromUpdateResponse(
    response: ClientSchemaUpdateResponse
  ): ClientSchema {
    return Object.assign({
      meta: {
        title: `${response.id} - ${response.type} - ${response.annee}`
      }
    }, response);
  }
}
