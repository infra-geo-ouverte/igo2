import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CLIENT, Client } from 'src/app/modules/client';
import { ClientState } from 'src/app/state/client.state';

import { SearchResult } from '../search.interfaces';
import { SearchSource, TextSearch } from './source';
import { SearchSourceOptions } from './source.interfaces';
import { ClientData } from './client.interfaces';

@Injectable()
export class ClientSearchSource extends SearchSource implements TextSearch {

  static id = 'client';
  static type = CLIENT;

  constructor(
    private clientState: ClientState,
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
    return this.clientState.getSetClientByNum(term)
      .pipe(
        map((response: ClientData) => {
          if (response === undefined) {
            return [];
          }
          return this.extractResults(response);
        })
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
        id: [this.getId(), data.info.numero].join('.'),
        title: data.info.nom,
        icon: 'person'
      }
    };
  }

}
