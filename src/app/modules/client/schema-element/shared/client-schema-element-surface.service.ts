import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/modules/core/api';
import { getEntityId } from 'src/app/modules/entity';

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
    @Inject('clientSchemaElementSurfaceApiConfig') private apiConfig: ClientSchemaElementSurfaceApiConfig
  ) {}

  getElements(schema: ClientSchema): Observable<ClientSchemaElementSurface[]> {
    /*
    const url = this.apiService.buildUrl(this.apiConfig.list, {
      schemaId: getEntityId(schema)
    });

    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaElementSurfaceListResponse) => {
          return this.extractElementsFromListResponse(response);
        })
      );
    */
   return of([
      {
        'type': 'Feature',
        'properties': {
          'idElementGeometrique': '14237',
          'etiquette': '1',
          'description': null,
          'typeElement': 'AUT',
          'descriptionTypeElement': 'Autre',
          'anneeImage': '2015',
          'timbreMaj': '',
          'usagerMaj': ''
        },
        'geometry': {
          'type': 'Polygon',
          'coordinates': [[
            [-72.435438, 46.181661],
            [-72.434715, 46.181161],
            [-72.433381, 46.1802],
            [-72.433228, 46.180148],
            [-72.433118, 46.180191],
            [-72.43312, 46.180279],
            [-72.433087, 46.180352],
            [-72.433172, 46.180419],
            [-72.433236, 46.180445],
            [-72.433415, 46.180608],
            [-72.433493, 46.180685],
            [-72.433579, 46.180808],
            [-72.433833, 46.181054],
            [-72.433819, 46.181089],
            [-72.433788, 46.181125],
            [-72.433626, 46.181223],
            [-72.433596, 46.181249],
            [-72.433595, 46.181291],
            [-72.433606, 46.181326],
            [-72.433914, 46.181715],
            [-72.433945, 46.181803],
            [-72.433931, 46.181841],
            [-72.433892, 46.181893],
            [-72.433565, 46.182112],
            [-72.433537, 46.182148],
            [-72.433552, 46.182197],
            [-72.434021, 46.182522],
            [-72.434068, 46.182532],
            [-72.434124, 46.18252],
            [-72.435438, 46.181661]
          ]]
        }
      }
    ]).pipe(
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
        idProperty: 'properties.idElementGeometrique',
        titleProperty: 'properties.etiquette'
      },
      type: listItem.type,
      projection: 'EPSG:4326',
      geometry: listItem.geometry,
      extent: undefined,
      properties
    };
  }
}
