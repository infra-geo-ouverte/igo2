import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CLIENT } from '../../../client/shared/client.enum';
import { Client } from '../../../client/shared/client.interface';
import { ClientService } from '../../../client/shared/client.service';
import { Entity } from '../../../entity/shared/entity.interface';
import { SearchSource, TextSearch } from './source';
import { SearchSourceOptions } from './source.interface';
import { ClientResult } from './client.interface';

@Injectable()
export class ClientSearchSource
    extends SearchSource implements TextSearch {

  static id = 'client';
  static type = CLIENT;

  constructor(
    protected options: SearchSourceOptions,
    private http: HttpClient,
    private clientService: ClientService
  ) {
    super();
    this.initOptions(options);
  }

  getId(): string {
    return ClientSearchSource.id;
  }

  getDefaultOptions(): SearchSourceOptions {
    return {
      title: 'Client (FADQ)'
    };
  }

  search(term?: string): Observable<Entity<Client>[]> {
    return this.clientService.getClientByNum(term)
      .pipe(
        map((response: ClientResult) => this.extractEntities(response))
      );
  }

  private extractEntities(response: ClientResult): Entity<Client>[] {
    return [this.resultToEntity(response)];
  }

  private resultToEntity(result: ClientResult): Entity<Client> {
    return {
      rid: [this.getId(), result.numero].join('.'),
      provider: this,
      meta: {
        dataType: CLIENT,
        id: result.numero,
        title: result.nom,
        icon: 'person'
      },
      data: result
    };
  }

}
