import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/modules/core/api';
import { getEntityId } from 'src/app/modules/entity';
import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaFile,
  ClientSchemaFileApiConfig,
  ClientSchemaFileListResponse,
  ClientSchemaFileListResponseItem,
  ClientSchemaFileGetResponse,
  ClientSchemaFileCreateData,
  ClientSchemaFileCreateResponse
} from './client-schema-file.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaFileService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('clientSchemaFileApiConfig') private apiConfig: ClientSchemaFileApiConfig
  ) {}

  getClientSchemaFiles(schema: ClientSchema): Observable<ClientSchemaFile[]> {
    const url = this.apiService.buildUrl(this.apiConfig.list, {schemaId: getEntityId(schema)});

    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaFileListResponse) => {
          return this.extractSchemaFilesFromListResponse(response);
        })
      );
  }

  getSchemaFileData(schemaFile: ClientSchemaFile): Observable<string> {
    const url = this.apiService.buildUrl(this.apiConfig.get, {
      id: getEntityId(schemaFile)
    });

    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaFileGetResponse) => {
          return response.document;
        })
      );
  }

  createSchemaFile(data: ClientSchemaFileCreateData): Observable<ClientSchemaFile> {
    const url = this.apiService.buildUrl(this.apiConfig.create);

    return this.http
      .post(url, data)
      .pipe(
        map((response: ClientSchemaFileCreateResponse) => {
          return this.extractSchemaFromCreateResponse(response);
        })
      );
  }

  deleteSchemaFile(schemaFile: ClientSchemaFile): Observable<any> {
    const url = this.apiService.buildUrl(this.apiConfig.delete, {
      id: getEntityId(schemaFile)
    });

    return this.http.post(url, {});
  }

  private extractSchemaFilesFromListResponse(
    response: ClientSchemaFileListResponse
  ): ClientSchemaFile[] {
    const listItems = response.data || [];
    return listItems.map(listItem => this.listItemToSchemaFile(listItem));
  }

  private listItemToSchemaFile(listItem: ClientSchemaFileListResponseItem) {
    return {
      id: listItem.idDocumentSchema,
      name: listItem.nomPhysiqueDocument,
      address: listItem.addresseDocument,
      size: listItem.tailleDocument,
      type: listItem.typeDocument,
      meta: {
        title: `${listItem.nomPhysiqueDocument}`
      }
    };
  }

  private extractSchemaFromCreateResponse(
    response: ClientSchemaFileCreateResponse
  ): ClientSchemaFile {
    return {
      id: response.idDocumentSchema,
      name: response.nomPhysiqueDocument,
      address: response.addresseDocument,
      size: response.tailleDocument,
      type: response.typeDocument,
      meta: {
        title: `${response.nomPhysiqueDocument}`
      }
    };
  }
}
