import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { FormFieldSelectChoice } from '@igo2/common';

import { ApiService } from 'src/lib/core/api';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaElement,
  ClientSchemaElementTransactionData,
  ClientSchemaElementApiConfig,
  ClientSchemaElementTypeChoicesResponse,
  ClientSchemaElementTypeChoicesResponseItem
} from './client-schema-element.interfaces';

import { ClientSchemaElementPointService } from './client-schema-element-point.service';
import { ClientSchemaElementLineService } from './client-schema-element-line.service';
import { ClientSchemaElementSurfaceService } from './client-schema-element-surface.service';

@Injectable()
export class ClientSchemaElementService {

  private clientSchemaElementTypeChoices: {[key: string]: {[key: string]: FormFieldSelectChoice[]}} = {};

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
   * This method returns the element type choices, grouped by geometry type, for
   * a given type of schema.
   * Normally, this kind of method would be in the form service, but, since it's a bit different
   * from regular "choices" methods, it's here.
   * @param schemaType Schema type (code)
   * @returns Observable of the element types, grouped by geoemtry type
   */
  getClientSchemaElementTypeChoices(
    schemaType: string
  ): Observable<{[key: string]: FormFieldSelectChoice[]}> {
    if (this.clientSchemaElementTypeChoices[schemaType] !== undefined) {
      return of(this.clientSchemaElementTypeChoices[schemaType]);
    }

    const url = this.apiService.buildUrl(this.apiConfig.domains.type, {
      schemaType: schemaType
    });
    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaElementTypeChoicesResponse) => {
          return this.extractSchemaTypeChoicesFromResponse(response);
        }),
        tap((choices: {[key: string]: FormFieldSelectChoice[]}) => {
          this.cacheClientSchemaElementTypeChoices(schemaType, choices);
        })
      );
  }

  private extractSchemaTypeChoicesFromResponse(
    response: ClientSchemaElementTypeChoicesResponse
  ): {[key: string]: FormFieldSelectChoice[]} {
    const createChoice = (item: ClientSchemaElementTypeChoicesResponseItem) => {
      return Object.create({
        value: item.idTypeElement,
        title: item.libelleFrancaisAbr
      });
    };

    return {
      'Point': response.data.lstTypeElementPoint.map(createChoice),
      'LineString': response.data.lstTypeElementLigne.map(createChoice),
      'Polygon': response.data.lstTypeElementSurface.map(createChoice)
    };
  }

  private cacheClientSchemaElementTypeChoices(schemaType: string, choices: {[key: string]: FormFieldSelectChoice[]}) {
    this.clientSchemaElementTypeChoices[schemaType] = choices;
  }

}
