import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CLIENT } from '../../../client/shared/client.enum';
import { Client } from '../../../client/shared/client.interface';
import { ClientService } from '../../../client/shared/client.service';
import { SearchResult } from '../search.interface';
import { SearchSource, TextSearch } from './source';
import { SearchSourceOptions } from './source.interface';
import { ClientData } from './client.interface';

@Injectable()
export class ClientSearchSource extends SearchSource implements TextSearch {

  static id = 'client';
  static type = CLIENT;

  constructor(
    private clientService: ClientService,
    @Inject('options') options: SearchSourceOptions
  ) {
    super(options);
  }

  getId(): string {
    return ClientSearchSource.id;
  }

  getDefaultOptions(): SearchSourceOptions {
    return {
      title: 'Client (FADQ)'
    };
  }

  search(term?: string): Observable<SearchResult<Client>[]> {
    return this.clientService.getClientByNum(term)
      .pipe(
        map((response: ClientData) => this.extractResults(response))
      );
  }

  private extractResults(response: ClientData): SearchResult<Client>[] {
    return [this.dataToResult(response)];
  }

  private dataToResult(data: ClientData): SearchResult<Client> {
    return {
      source: this,
      data: data,
      meta: {
        dataType: CLIENT,
        id: [this.getId(), data.numero].join('.'),
        title: data.nom,
        icon: 'person'
      }
    };
  }

}
