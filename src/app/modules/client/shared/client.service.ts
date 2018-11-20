import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { Client } from './client.interface';
import { ClientInfoService } from './client-info.service';
import { ClientSchemaService } from './client-schema.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private infoService: ClientInfoService,
    private schemaService: ClientSchemaService
  ) {}

  getClientByNum(clientNum: string): Observable<Client> {
    return this.infoService.getClientInfoByNum(clientNum)
      .pipe(
        withLatestFrom(this.schemaService.getClientSchemasByNum(clientNum)),
        map(([info, schemas]) => {
          return Object.assign({id: info.numero}, info, {schemas});
        })
      );
  }
}
