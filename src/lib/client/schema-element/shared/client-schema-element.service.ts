import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaElement,
  ClientSchemaElementTransactionData
} from './client-schema-element.interfaces';
import { ClientSchemaElementPointService } from './client-schema-element-point.service';
import { ClientSchemaElementLineService } from './client-schema-element-line.service';
import { ClientSchemaElementSurfaceService } from './client-schema-element-surface.service';

@Injectable()
export class ClientSchemaElementService {

  constructor(
    private schemaElementPointService: ClientSchemaElementPointService,
    private schemaElementLineService: ClientSchemaElementLineService,
    private schemaElementSurfaceService: ClientSchemaElementSurfaceService
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

}
