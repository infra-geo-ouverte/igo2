import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';
import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaFile,
  ClientSchemaFileApiConfig,
  ClientSchemaFileListResponse,
  ClientSchemaFileListResponseItem,
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
    const url = this.apiService.buildUrl(this.apiConfig.list, {schemaId: schema.id});

    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaFileListResponse) => {
          return this.extractSchemaFilesFromListResponse(response);
        })
      );
  }

  getSchemaFileDownloadLink(schemaFile: ClientSchemaFile): Observable<string> {
    const link = this.apiService.buildUrl(this.apiConfig.download, {
      id: schemaFile.id
    });

    return of(link);
  }

  createSchemaFile(schema: ClientSchema, data: ClientSchemaFileCreateData): Observable<ClientSchemaFile> {
    const url = this.apiService.buildUrl(this.apiConfig.create, {
      schemaId: schema.id
    });

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const formData = new FormData();
    Object.entries(data).forEach((entries: [string, any]) => {
      formData.append(entries[0], entries[1]);
    });

    return this.http
      .post(url, formData, {headers})
      .pipe(
        map((response: ClientSchemaFileCreateResponse) => {
          return this.extractSchemaFromCreateResponse(response);
        })
      );
  }

  deleteSchemaFile(schemaFile: ClientSchemaFile): Observable<any> {
    const url = this.apiService.buildUrl(this.apiConfig.delete, {
      id: schemaFile.id
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
    const data = response.data;
    return {
      id: data.idDocumentSchema,
      name: data.nomPhysiqueDocument,
      address: data.addresseDocument,
      size: data.tailleDocument,
      type: data.typeDocument
    };
  }
}
