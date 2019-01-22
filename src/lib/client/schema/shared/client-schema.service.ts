import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';
import { getEntityId } from 'src/lib/entity';
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
    const url = this.apiService.buildUrl(this.apiConfig.list, {clientNum});
    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaListResponse) => {
          return this.extractSchemasFromListResponse(response);
        })
      );
  }

  createSchema(data: ClientSchemaCreateData): Observable<ClientSchema> {
    const url = this.apiService.buildUrl(this.apiConfig.create);

    return this.http
      .post(url, data)
      .pipe(
        map((response: ClientSchemaCreateResponse) => {
          return this.extractSchemaFromCreateResponse(response);
        })
      );
  }

  updateSchema(schema: ClientSchema, data: ClientSchemaUpdateData): Observable<ClientSchema> {
    const url = this.apiService.buildUrl(this.apiConfig.update);

    return this.http
      .post(url, data)
      .pipe(
        map((response: ClientSchemaUpdateResponse) => {
          return this.extractSchemaFromUpdateResponse(response);
        })
      );
  }

  deleteSchema(schema: ClientSchema): Observable<any> {
    const url = this.apiService.buildUrl(this.apiConfig.delete, {
      id: getEntityId(schema)
    });

    return this.http.post(url, {});
  }

  duplicateSchema(schema: ClientSchema): Observable<ClientSchema> {
    const url = this.apiService.buildUrl(this.apiConfig.duplicate, {
      id: getEntityId(schema)
    });

    return this.http
      .post(url, {})
      .pipe(
        map((response: ClientSchemaDuplicateResponse) => {
          return this.extractSchemaFromDuplicateResponse(response);
        })
      );
  }

  private extractSchemasFromListResponse(
    response: ClientSchemaListResponse
  ): ClientSchema[] {
    const listItems = response.data || [];
    return listItems.map(listItem => this.listItemToSchema(listItem));
  }

  private listItemToSchema(listItem: ClientSchemaListResponseItem) {
    const type = listItem.typeSchema.code;
    return Object.assign({
      meta: {
        title: `${listItem.id} - ${type} - ${listItem.annee}`
      },
      type: type,
      descriptionType: listItem.typeSchema.descriptionAbregeeFrancais,
    }, listItem);
  }

  private extractSchemaFromCreateResponse(
    response: ClientSchemaCreateResponse
  ): ClientSchema {
    const data = response.data;
    const type = data.typeSchema.code;
    return Object.assign({
      meta: {
        title: `${data.id} - ${type} - ${data.annee}`
      },
      type: type,
      descriptionType: data.typeSchema.descriptionAbregeeFrancais,
    }, data);
  }

  private extractSchemaFromUpdateResponse(
    response: ClientSchemaUpdateResponse
  ): ClientSchema {
    const data = response.data;
    const type = data.typeSchema.code;
    return Object.assign({
      meta: {
        title: `${data.id} - ${type} - ${data.annee}`
      },
      type: type,
      descriptionType: data.typeSchema.descriptionAbregeeFrancais,
    }, data);
  }

  private extractSchemaFromDuplicateResponse(
    response: ClientSchemaDuplicateResponse
  ): ClientSchema {
    const data = response.data;
    const type = data.typeSchema.code;
    return Object.assign({
      meta: {
        title: `${data.id} - ${type} - ${data.annee}`
      },
      type: type,
      descriptionType: data.typeSchema.descriptionAbregeeFrancais,
    }, data);
  }
}
