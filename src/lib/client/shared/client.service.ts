import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigService } from '@igo2/core';

import { substituteProperties } from 'src/lib/utils';

import { ClientInfo, ClientInfoService } from '../info';
import { ClientParcel, ClientParcelService, getDiagramsFromParcels } from '../parcel';
import { ClientSchema, ClientSchemaService } from '../schema';

import { Client } from './client.interfaces';

@Injectable()
export class ClientService {

  constructor(
    private infoService: ClientInfoService,
    private parcelService: ClientParcelService,
    private schemaService: ClientSchemaService,
    private configService: ConfigService
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

  /**
   * Compute the link to the client's info
   * @internal
   * @param client Client
   * @returns External link to the client's info
   */
  getClientInfoLink(clientNum: string): string {
    const baseUrl = this.configService.getConfig('client.infoLink');
    return substituteProperties(baseUrl, {clientNum: clientNum});
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
