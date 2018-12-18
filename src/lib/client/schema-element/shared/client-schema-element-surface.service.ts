import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';
import { getEntityId } from 'src/lib/entity';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaElementSurface,
  ClientSchemaElementSurfaceApiConfig,
  ClientSchemaElementSurfaceListResponse,
  ClientSchemaElementSurfaceListResponseItem
} from './client-schema-element.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementSurfaceService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('clientSchemaElementSurfaceApiConfig')
    private apiConfig: ClientSchemaElementSurfaceApiConfig
  ) {}

  getElements(schema: ClientSchema): Observable<ClientSchemaElementSurface[]> {
    const url = this.apiService.buildUrl(this.apiConfig.list, {
      schemaId: 10430 // getEntityId(schema)
    });

    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaElementSurfaceListResponse) => {
          return this.extractElementsFromListResponse(response);
        })
      );
  }

  private extractElementsFromListResponse(
    response: ClientSchemaElementSurfaceListResponse
  ): ClientSchemaElementSurface[] {
    return response.map(listItem => this.listItemToElement(listItem));
  }

  private listItemToElement(
    listItem: ClientSchemaElementSurfaceListResponseItem
  ): ClientSchemaElementSurface {
    const properties = Object.assign({}, listItem.properties);
    return {
      meta: {
        idProperty: 'properties.idElementGeometrique'
      },
      type: listItem.type,
      projection: 'EPSG:4326',
      geometry: listItem.geometry,
      extent: undefined,
      properties
    };
  }
}
