import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { getDiagramsFromParcels } from './client.utils';
import { Client, ClientInfo, ClientParcel, ClientSchema } from './client.interface';
import { ClientInfoService } from './client-info.service';
import { ClientParcelService } from './client-parcel.service';
import { ClientSchemaService } from './client-schema.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private infoService: ClientInfoService,
    private parcelService: ClientParcelService,
    private schemaService: ClientSchemaService
  ) {}

  getClientByNum(clientNum: string): Observable<Client> {
    const client$ = zip(
      this.infoService.getClientInfoByNum(clientNum),
      this.parcelService.getClientParcelsByNum(clientNum),
      this.schemaService.getClientSchemasByNum(clientNum)
    );

    return client$
      .pipe(
        map((data: [ClientInfo, ClientParcel[], ClientSchema[]]) => {
          return Object.assign({meta: {idProperty: 'numero'}}, data[0], {
            parcels: data[1],
            schemas: data[2],
            diagrams: getDiagramsFromParcels(data[1]),
            annees: []
          });
        })
      );
  }
}
