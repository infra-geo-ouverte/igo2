import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/modules/core/api';
import { getEntityId } from 'src/app/modules/entity';
import {
  ClientSchema,
  ClientSchemaFile,
  ClientSchemaFileApiConfig,
  ClientSchemaFileListResponse,
  ClientSchemaFileListResponseItem,
  ClientSchemaFileCreateData,
  ClientSchemaFileCreateResponse
} from './client-schema.interfaces';

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
    return of({
      'messages': [],
      'donnees': [
        {
          'idDocumentSchema': '1',
          'nomPhysiqueDocument': 'Sample pdf',
          'addresseDocument': '/foo',
          'tailleDocument': 25,
          'typeDocument': 'pdf'
        },
        {
          'idDocumentSchema': '2',
          'nomPhysiqueDocument': 'Sample image',
          'addresseDocument': '/foo',
          'tailleDocument': 50,
          'typeDocument': 'image'
        }
      ]
    }).pipe(
      map((response: ClientSchemaFileListResponse) => {
        return this.extractSchemaFilesFromListResponse(response);
      })
    );
    /*
    const url = this.apiService.buildUrl(this.apiConfig.list, {schemaId: getEntityId(schema)});
    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaFileListResponse) => {
          return this.extractSchemasFromListResponse(response);
        })
      );
    */
  }

  getSchemaFileData(schemaFile: ClientSchemaFile): Observable<string> {
    return of('');
  }

  createSchemaFile(data: ClientSchemaFileCreateData): Observable<ClientSchemaFile> {
    return of({
      'id': '1234',
      'name': 'Sample upload',
      'address': '/foo',
      'size': 75,
      'type': 'pdf'
    });
    /*
    const url = this.apiService.buildUrl(this.apiConfig.create);
    const params = new HttpParams({
      fromObject: data as { [key: string]: any}
    });

    return this.http
      .post(url, {params})
      .pipe(
        map((response: ClientSchemaFileCreateResponse) => {
          return this.extractSchemaFromCreateResponse(response);
        })
      );
    */
  }

  deleteSchemaFile(schemaFile: ClientSchemaFile): Observable<any> {
    return of({});
    /*
    const url = this.apiService.buildUrl(this.apiConfig.delete, {
      id: getEntityId(schema)
    });

    return this.http.post(url, {});
    */
  }

  private extractSchemaFilesFromListResponse(
    response: ClientSchemaFileListResponse
  ): ClientSchemaFile[] {
    const listItems = response.donnees || [];
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
