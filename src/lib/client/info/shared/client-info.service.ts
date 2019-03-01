import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';
import {
  ClientInfo,
  ClientInfoApiConfig,
  ClientInfoGetResponse,
  ClientInfoGetResponseData
} from './client-info.interfaces';

@Injectable()
export class ClientInfoService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('clientInfoApiConfig') private apiConfig: ClientInfoApiConfig
  ) {}

  getClientInfoByNum(clientNum: string): Observable<ClientInfo> {
    const url = this.apiService.buildUrl(this.apiConfig.get, {clientNum});

    return this.http
      .get(url)
      .pipe(
        map((response: ClientInfoGetResponse) => {
          return this.extractClientInfoFromGetResponse(response);
        })
      );
  }

  private extractClientInfoFromGetResponse(response: ClientInfoGetResponse): ClientInfo | undefined {
    const data = response.data;
    if (data === null) {
      return undefined;
    }
    return {
      numero: data.numeroClient,
      nom: data.nomClient,
      adresseCor: this.extractAddressFromGetResponseData(data, 'Correspondance'),
      adresseExp: this.extractAddressFromGetResponseData(data, 'Exploitation'),
      adressePro: this.extractAddressFromGetResponseData(data, 'Production')
    };
  }

  private extractAddressFromGetResponseData(data: ClientInfoGetResponseData, suffix: string) {
    const no = data[`adresse${suffix}`];
    const suite = data[`suiteAdresse${suffix}`];
    const mun = data[`municipaliteAdresse${suffix}`];
    const code = data[`codePostalAdresse${suffix}`];
    const province = data[`provinceAdresse${suffix}`] || {};
    const provinceName = province['province'];

    let address = [no, suite, mun, code]
      .filter((item: string) => item !== undefined)
      .join(' ');

    if (provinceName !== undefined) {
      address = address.concat(` (${provinceName})`);
    }

    return address;
  }

}
