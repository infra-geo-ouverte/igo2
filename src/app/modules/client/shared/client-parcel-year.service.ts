import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/modules/core/api';
import {
  ClientApiConfig,
  ClientParcelYearListResponse,
  ClientParcelYearListResult,
  ClientParcelYear
} from './client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientParcelYearService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('apiConfig') private apiConfig: ClientApiConfig
  ) {}

  loadParcelYears(): Observable<ClientParcelYear[]> {
    const url = this.apiService.buildUrl(this.apiConfig.parcelYears);

    return this.http
      .get(url)
      .pipe(
        map((response: ClientParcelYearListResponse) => {
          return this.extractParcelYearsFromResponse(response);
        })
      );
  }

  private extractParcelYearsFromResponse(response: ClientParcelYearListResponse): ClientParcelYear[] {
    return response.data.map(result => this.resultToParcelYear(result));
  }

  private resultToParcelYear(result: ClientParcelYearListResult): ClientParcelYear {
    return {
      id: '' + result.idParametre,
      annee: result.annee,
      current: result.indAnneeActive
    };
  }
}
