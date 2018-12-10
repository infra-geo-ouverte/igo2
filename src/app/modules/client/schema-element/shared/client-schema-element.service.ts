import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaElementPoint,
  ClientSchemaElementLine,
  ClientSchemaElementSurface
} from './client-schema-element.interfaces';
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
    private schemaElementSurfaceService: ClientSchemaElementSurfaceService
  ) {}

  getElements(schema: ClientSchema): Observable<ClientSchemaElements> {
    const elements$ = zip(
      of([]),
      of([]),
      this.schemaElementSurfaceService.getElements(schema)
    );

    return elements$;
  }
}
