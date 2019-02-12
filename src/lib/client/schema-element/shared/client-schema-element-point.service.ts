import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaElement,
  ClientSchemaElementApiConfig,
  ClientSchemaElementListResponse,
  ClientSchemaElementListResponseItem
} from './client-schema-element.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementPointService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('clientSchemaElementApiConfig')
    private apiConfig: ClientSchemaElementApiConfig
  ) {}

  getElements(schema: ClientSchema): Observable<ClientSchemaElement[]> {
    const url = this.apiService.buildUrl(this.apiConfig.points, {
      schemaId: schema.id
    });

    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaElementListResponse) => {
          return this.extractElementsFromListResponse(response);
        })
      );
  }

  private extractElementsFromListResponse(response: ClientSchemaElementListResponse): ClientSchemaElement[] {
    return response.map(listItem => this.listItemToElement(listItem));
  }

  private listItemToElement(listItem: ClientSchemaElementListResponseItem): ClientSchemaElement {
    const properties = Object.assign({}, listItem.properties);
    return {
      type: listItem.type,
      projection: 'EPSG:4326',
      geometry: listItem.geometry,
      extent: undefined,
      properties,
      meta: {
        id: properties.idElementGeometrique
      }
    };
  }
}
