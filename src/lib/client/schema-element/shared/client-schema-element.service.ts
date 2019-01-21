import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaElementPoint,
  ClientSchemaElementLine,
  ClientSchemaElementSurface,
  ClientSchemaElementTransactionData
} from './client-schema-element.interfaces';
import { ClientSchemaElementPointService } from './client-schema-element-point.service';
import { ClientSchemaElementLineService } from './client-schema-element-line.service';
import { ClientSchemaElementSurfaceService } from './client-schema-element-surface.service';

export type ClientSchemaElements = [
    ClientSchemaElementPoint[],
    ClientSchemaElementLine[],
    ClientSchemaElementSurface[]
];

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementService {

  constructor(
    private schemaElementPointService: ClientSchemaElementPointService,
    private schemaElementLineService: ClientSchemaElementLineService,
    private schemaElementSurfaceService: ClientSchemaElementSurfaceService
  ) {}

  getElements(schema: ClientSchema): Observable<ClientSchemaElements> {
    const elements$ = zip(
      this.schemaElementPointService.getElements(schema),
      this.schemaElementLineService.getElements(schema),
      this.schemaElementSurfaceService.getElements(schema)
    );

    return elements$;
  }

  saveElements(schema: ClientSchema, data: ClientSchemaElementTransactionData): Observable<any> {
    // TODO
    return of({});
  }
}
