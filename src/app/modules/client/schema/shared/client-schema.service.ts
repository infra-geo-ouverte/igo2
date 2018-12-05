import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/modules/core/api';
import { getEntityId } from 'src/app/modules/entity';
import {
  ClientSchema,
  ClientSchemaApiConfig,
  ClientSchemaListResponse,
  ClientSchemaListResponseItem,
  ClientSchemaCreateData,
  ClientSchemaCreateResponse,
  ClientSchemaUpdateData,
  ClientSchemaUpdateResponse,
  ClientSchemaDuplicateResponse
} from './client-schema.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('clientSchemaApiConfig') private apiConfig: ClientSchemaApiConfig
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
    const url = this.apiService.buildUrl(this.apiConfig.list, {clientNum});
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
    return of(Object.assign({id: '1234'}, data));
    /*
    const url = this.apiService.buildUrl(this.apiConfig.create);
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
    */
  }

  updateSchema(schema: ClientSchema, data: ClientSchemaUpdateData): Observable<ClientSchema> {
    return of(Object.assign({}, schema, data));
    /*
    const url = this.apiService.buildUrl(this.apiConfig.update);
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
    */
  }

  deleteSchema(schema: ClientSchema): Observable<any> {
    return of({});
    /*
    const url = this.apiService.buildUrl(this.apiConfig.delete, {
      id: getEntityId(schema)
    });

    return this.http.post(url, {});
    */
  }

  duplicateSchema(schema: ClientSchema): Observable<ClientSchema> {
    console.log(Object.assign({}, schema, {id: '1234'}));
    return of(Object.assign({}, schema, {id: '1234'}));
    /*
    const url = this.apiService.buildUrl(this.apiConfig.duplicate, {
      id: getEntityId(schema)
    });

    return this.http
      .post(url, {});
      .pipe(
        map((response: ClientSchemaDuplicateResponse) => {
          return this.extractSchemaFromDuplicateResponse(response);
        })
      );
    */
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

  private extractSchemaFromDuplicateResponse(
    response: ClientSchemaDuplicateResponse
  ): ClientSchema {
    return Object.assign({
      meta: {
        title: `${response.id} - ${response.type} - ${response.annee}`
      }
    }, response);
  }
}
