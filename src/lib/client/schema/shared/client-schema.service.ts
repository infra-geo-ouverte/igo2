import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';
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

@Injectable()
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
      id: schema.id
    });

    return this.http.post(url, {});
  }

  duplicateSchema(schema: ClientSchema): Observable<ClientSchema> {
    const url = this.apiService.buildUrl(this.apiConfig.duplicate, {
      id: schema.id
    });

    return this.http
      .post(url, {})
      .pipe(
        map((response: ClientSchemaDuplicateResponse) => {
          return this.extractSchemaFromDuplicateResponse(response);
        })
      );
  }

  transferSchema(schema: ClientSchema, numClient: string): Observable<string> {
    const url = this.apiService.buildUrl(this.apiConfig.update);
    const data = Object.assign({}, schema, {numeroClient: numClient});
    return this.http
      .post(url, data)
      .pipe(
        map((response: ClientSchemaUpdateResponse) => {
          return response.data.codeRetour;
        })
      );
  }

  private extractSchemasFromListResponse(
    response: ClientSchemaListResponse
  ): ClientSchema[] {
    const listItems = response.data || [];
    return listItems.map(listItem => this.listItemToSchema(listItem));
  }

  private listItemToSchema(listItem: ClientSchemaListResponseItem): ClientSchema {
    const type = listItem.typeSchema.code;
    return Object.assign({}, listItem, {
      type: type,
      descriptionType: listItem.typeSchema.descriptionAbregeeFrancais,
    });
  }

  private extractSchemaFromCreateResponse(
    response: ClientSchemaCreateResponse
  ): ClientSchema {
    const data = response.data;
    const type = data.typeSchema.code;
    return Object.assign({}, data, {
      type,
      descriptionType: data.typeSchema.descriptionAbregeeFrancais,
    });
  }

  private extractSchemaFromUpdateResponse(
    response: ClientSchemaUpdateResponse
  ): ClientSchema {
    const data = response.data.schema;
    const type = data.typeSchema.code;
    return Object.assign({}, data, {
      type,
      descriptionType: data.typeSchema.descriptionAbregeeFrancais,
    });
  }

  private extractSchemaFromDuplicateResponse(
    response: ClientSchemaDuplicateResponse
  ): ClientSchema {
    const data = response.data;
    const type = data.typeSchema.code;
    return Object.assign({}, data, {
      type,
      descriptionType: data.typeSchema.descriptionAbregeeFrancais,
    });
  }
}
