import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaElement,
  ClientSchemaElementTransactionData,
  ClientSchemaElementApiConfig,
  ClientSchemaElementTypes,
  ClientSchemaElementTypesResponse,
  ClientSchemaElementTypesResponseItem
} from './client-schema-element.interfaces';

import { ClientSchemaElementPointService } from './client-schema-element-point.service';
import { ClientSchemaElementLineService } from './client-schema-element-line.service';
import { ClientSchemaElementSurfaceService } from './client-schema-element-surface.service';

@Injectable()
export class ClientSchemaElementService {

  private schemaElementTypes: {[key: string]: ClientSchemaElementTypes} = {};

  constructor(
    private schemaElementPointService: ClientSchemaElementPointService,
    private schemaElementLineService: ClientSchemaElementLineService,
    private schemaElementSurfaceService: ClientSchemaElementSurfaceService,
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('clientSchemaElementApiConfig') private apiConfig: ClientSchemaElementApiConfig
  ) {}

  getElements(schema: ClientSchema): Observable<ClientSchemaElement[]> {
    const elements$ = zip(
      this.schemaElementPointService.getElements(schema),
      this.schemaElementLineService.getElements(schema),
      this.schemaElementSurfaceService.getElements(schema)
    );

    return elements$.pipe(
      map((elements: [ClientSchemaElement[], ClientSchemaElement[], ClientSchemaElement[]]) => {
        return [].concat(...elements);
      })
    );
  }

  saveElements(schema: ClientSchema, data: ClientSchemaElementTransactionData): Observable<any> {
    // TODO
    return of({});
  }

  /**
   * This method returns the element types supported for by a given type of schema.
   * @param schemaType Schema type (code)
   * @returns Observable of the element types, grouped by geometry type
   */
  getSchemaElementTypes(schemaType: string): Observable<ClientSchemaElementTypes> {
    if (this.schemaElementTypes[schemaType] !== undefined) {
      return of(this.schemaElementTypes[schemaType]);
    }

    const url = this.apiService.buildUrl(this.apiConfig.domains.type, {
      schemaType: schemaType
    });
    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaElementTypesResponse) => {
          return this.extractSchemaElementTypesFromResponse(response);
        }),
        tap((elementTypes: ClientSchemaElementTypes) => {
          this.cacheSchemaElementTypes(schemaType, elementTypes);
        })
      );
  }

  /**
   * This method returns the geometry types supported by a given type of schema.
   * @param schemaType Schema type (code)
   * @returns Observable of the geometry types
   */
  getSchemaElementGeometryTypes(schemaType: string): Observable<string[]> {
    return this.getSchemaElementTypes(schemaType).pipe(
      map((elementTypes: ClientSchemaElementTypes) => {
        return Object.keys(elementTypes).filter((key: string) => elementTypes[key].length > 0);
      })
    );
  }

  private extractSchemaElementTypesFromResponse(
    response: ClientSchemaElementTypesResponse
  ): ClientSchemaElementTypes {
    const createChoice = (item: ClientSchemaElementTypesResponseItem) => {
      return Object.create({
        value: item.idTypeElement,
        title: item.libelleFrancaisAbr
      });
    };

    return {
      Point: response.data.lstTypeElementPoint.map(createChoice),
      LineString: response.data.lstTypeElementLigne.map(createChoice),
      Polygon: response.data.lstTypeElementSurface.map(createChoice)
    };
  }

  private cacheSchemaElementTypes(schemaType: string, elementTypes:  ClientSchemaElementTypes) {
    this.schemaElementTypes[schemaType] = elementTypes;
  }

}
