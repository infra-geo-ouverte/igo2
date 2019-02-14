import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CLIENT, Client } from 'src/lib/client';
import {
  SearchResult,
  SearchSource,
  SearchSourceOptions,
  TextSearch
} from 'src/lib/search';
import { ClientData } from './client.interfaces';

import { ClientState } from 'src/app/modules/client/client.state';

/**
 * Client search source
 */
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

  protected getId(): string { return ClientSearchSource.id; }

  protected getDefaultOptions(): SearchSourceOptions {
    return {
      title: 'Client (FADQ)'
    };
  }

  /**
   * Search a client by num
   * @param term Client num
   * @returns Observable of <SearchResult<Client>[]
   */
  search(term?: string): Observable<SearchResult<Client>[]> {
    return this.clientState.getClientByNum(term)
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
