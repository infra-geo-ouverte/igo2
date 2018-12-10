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
        map((results: [ClientInfo, ClientSchema[], ClientParcel[]]) => {
         return  this.resultsToClient(results);
        })
      );
  }

  private resultsToClient(
    results: [ClientInfo, ClientSchema[], ClientParcel[]]
  ): Client | undefined {
    const [info, schemas, parcels] = results;
    if (info === undefined) {
      return undefined;
    }

    return Object.assign({meta: {idProperty: 'numero'}}, {
      info: info,
      schemas: schemas,
      parcels: parcels,
      diagrams: getDiagramsFromParcels(parcels)
    });
  }
}
