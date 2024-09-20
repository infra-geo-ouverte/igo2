import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImmeublesService {
  constructor(private http: HttpClient) {}

  getImmeubles(
    filter: string,
    columns: any,
    sort: any,
    limit: any,
    offset: any
  ) {
    return this.http.get(environment.immeublesUrl, {
      params: {
        filter,
        columns,
        sort,
        limit,
        offset
      }
    });
  }

  getBuildingDetails(numero_immeuble: any) {
    return this.http.get(environment.buildingDetailsUrl + numero_immeuble);
  }
}
