import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, zip } from 'rxjs';
import { concatMap, map, reduce, tap, catchError } from 'rxjs/operators';

import { EntityOperation, EntityTransaction } from '@igo2/common';

import { ApiService } from 'src/lib/core/api';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaElement,
  ClientSchemaElementTransactionData,
  ClientSchemaElementApiConfig,
  ClientSchemaElementTypes,
  ClientSchemaElementTypesResponse,
  ClientSchemaElementTypesResponseItem,
  GetElements,
  SaveElements
} from './client-schema-element.interfaces';

import { ClientSchemaElementPointService } from './client-schema-element-point.service';
import { ClientSchemaElementLineService } from './client-schema-element-line.service';
import { ClientSchemaElementSurfaceService } from './client-schema-element-surface.service';
import { ClientSchemaElementTransactionSerializer } from './client-schema-element.utils';

@Injectable()
export class ClientSchemaElementService {

  private schemaElementTypes: {[key: string]: ClientSchemaElementTypes} = {};

  get services(): {[key: string]: object} {
    return {
      'Point': this.schemaElementPointService,
      'LineString': this.schemaElementLineService,
      'Polygon': this.schemaElementSurfaceService
    };
  }

  constructor(
    private schemaElementPointService: ClientSchemaElementPointService,
    private schemaElementLineService: ClientSchemaElementLineService,
    private schemaElementSurfaceService: ClientSchemaElementSurfaceService,
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('clientSchemaElementApiConfig') private apiConfig: ClientSchemaElementApiConfig
  ) {}

  /**
   * Get all the elements of a schema.
   * @param schema Schema
   * @returns Observable of the all the elements of the schema
   */
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

  /**
   * Commit (save) a whole transaction  containig points, lines and polygons. Each of those geometry type
   * has it's own endpoint so we're making 3 requests. On a success, elements of the same geometry
   * type are fetched and returned
   * @param schema Schema
   * @param transaction Transaction shared by all geometry types
   * @returns Observable of the all the elements by geometry type or of an error object
   */
  commitTransaction(
    schema: ClientSchema,
    transaction: EntityTransaction
  ): Observable<Array<ClientSchemaElement[] | Error>> {
    const commits$ = ['Point', 'LineString', 'Polygon'].map((type: string) => {
      const operations = transaction.operations.all().filter((operation: EntityOperation) => {
        const element = (operation.current || operation.previous) as ClientSchemaElement;
        return element.geometry.type === type;
      });

      return transaction.commit(operations, (tx: EntityTransaction, ops: EntityOperation[]) => {
        return this.commitOperationsOfType(schema, ops, type);
      });
    });

    return zip(...commits$);
  }

  /**
   * Commit (save) some operations of a transaction
   * @param schema Schema
   * @param operations Transaction operations
   * @param geometryType The geometry type of the data we're saving
   * @returns Observable of the all the elements of that by geometry type or of an error object
   */
  private commitOperationsOfType(
    schema: ClientSchema,
    operations: EntityOperation[],
    geometryType: string
  ): Observable<ClientSchemaElement[] | Error> {
    const serializer = new ClientSchemaElementTransactionSerializer();
    const data = serializer.serializeOperations(operations);
    return this.saveElements(schema, data, geometryType);
  }

  /**
   * Save the elements of a geometry type then fetch all the elements of the type.
   * @param schema Schema
   * @param data Data to save
   * @param geometryType The geometry type of the data we're saving
   * @returns Observable of the all the elements of that by geometry type or of an error object
   */
  private saveElements(
    schema: ClientSchema,
    data: ClientSchemaElementTransactionData,
    geometryType: string
  ): Observable<ClientSchemaElement[] | Error> {
    const service = this.services[geometryType];

    return (service as SaveElements).saveElements(schema, data)
      .pipe(
        catchError(() => of(new Error(geometryType))),
        concatMap((response: any) => {
          if (response instanceof Error) {
            return of(response);
          } else {
            return (service as GetElements).getElements(schema);
          }
        })
      );
  }

  /**
   * Extract schema elements from response
   * @param response Backend response
   * @returns Observable of schema elements
   */
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

  /**
   * Cache the schema element types by schema type
   * @param schemaType Schema type
   * @param elementTypes Element types
   */
  private cacheSchemaElementTypes(schemaType: string, elementTypes:  ClientSchemaElementTypes) {
    this.schemaElementTypes[schemaType] = elementTypes;
  }

}
