import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';
import {
  ClientParcelApiConfig,
  ClientParcelYear,
  ClientParcelYearListResponse,
  ClientParcelYearListResponseItem
} from './client-parcel.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientParcelYearService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('clientParcelApiConfig') private apiConfig: ClientParcelApiConfig
  ) {}

  getParcelYears(): Observable<ClientParcelYear[]> {
    const url = this.apiService.buildUrl(this.apiConfig.years);

    return this.http
      .get(url)
      .pipe(
        map((response: ClientParcelYearListResponse) => {
          return this.extractParcelYearsFromListResponse(response);
        })
      );
  }

  private extractParcelYearsFromListResponse(
    response: ClientParcelYearListResponse
  ): ClientParcelYear[] {
    return response.data.map(listItem => this.listItemToParcelYear(listItem));
  }

  private listItemToParcelYear(
    listItem: ClientParcelYearListResponseItem
  ): ClientParcelYear {
    return {
      id: '' + listItem.idParametre,
      annee: listItem.annee,
      current: listItem.indAnneeActive
    };
  }
}
