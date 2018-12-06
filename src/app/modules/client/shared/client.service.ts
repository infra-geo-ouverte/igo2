import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClientInfo, ClientInfoService } from '../info';
import { ClientParcel, ClientParcelService, getDiagramsFromParcels } from '../parcel';
import { ClientSchema, ClientSchemaService } from '../schema';

import { Client } from './client.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private infoService: ClientInfoService,
    private parcelService: ClientParcelService,
    private schemaService: ClientSchemaService
  ) {}

  getClientByNum(clientNum: string, annee: number = 2018): Observable<Client> {
    const client$ = zip(
      this.infoService.getClientInfoByNum(clientNum),
      this.schemaService.getClientSchemasByNum(clientNum),
      this.parcelService.getClientParcelsByNum(clientNum, annee)
    );

    return client$
      .pipe(
        map((data: [ClientInfo, ClientSchema[], ClientParcel[]]) => {
          return Object.assign({meta: {idProperty: 'numero'}}, {
            info: data[0],
            schemas: data[1],
            parcels: data[2],
            diagrams: getDiagramsFromParcels(data[2])
          });
        })
      );
  }

}
