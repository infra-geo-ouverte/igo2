import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/lib/core/api';
import { substituteProperties } from 'src/lib/utils';
import {
  ClientInfo,
  ClientInfoAddresses,
  ClientInfoApiConfig,
  ClientInfoGetResponse,
  ClientInfoAddressesResponse,
  ClientInfoAddressData
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
    const clientBaseInfo$ = this.http
      .get(url)
      .pipe(
        map((response: ClientInfoGetResponse) => {
          return this.extractClientInfoFromGetResponse(response);
        })
      );

    const client$ = zip(
      clientBaseInfo$,
      this.getClientAddressesByNum(clientNum)
    );

    return client$.pipe(
      map((results: [ClientInfo, ClientInfoAddresses]) => Object.assign(...results))
    );
  }

  private getClientAddressesByNum(clientNum: string): Observable<ClientInfoAddresses> {
    const url = this.apiService.buildUrl(this.apiConfig.addresses, {clientNum});

    return this.http
      .get(url)
      .pipe(
        map((response: ClientInfoAddressesResponse) => {
          return this.extractClientAddressesFromResponse(response);
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
    return substituteProperties(this.apiConfig.link, {clientNum: clientNum});
  }

  private extractClientInfoFromGetResponse(response: ClientInfoGetResponse): ClientInfo | undefined {
    const data = response.data;
    if (data === null) {
      return undefined;
    }
    return {
      numero: data.numeroClient,
      nom: data.nomClient,
      adresseCor: undefined,
      adresseExp: undefined,
      adressePro: undefined
    };
  }

  private extractClientAddressesFromResponse(response: ClientInfoAddressesResponse): ClientInfoAddresses {
    const data = response.data;
    return {
      adresseCor: this.extractAddressFromGetResponseData(
        data.find((address: ClientInfoAddressData) => address.typeAdresse === 'COR')
      ),
      adresseExp: this.extractAddressFromGetResponseData(
        data.find((address: ClientInfoAddressData) => address.typeAdresse === 'EXP')
      ),
      adressePro: this.extractAddressFromGetResponseData(
        data.find((address: ClientInfoAddressData) => address.typeAdresse === 'PRO')
      )
    };
  }

  private extractAddressFromGetResponseData(data: ClientInfoAddressData) {
    if (data === undefined) { return undefined; }
 
    const no = data[`noAdresse`];
    const suite = data[`suiteAdresse`];
    const mun = data[`municipaliteAdresse`];
    const code = data[`codePostalAdresse`];
    const province = data[`provincePaysAdresse`];

    return [no, suite, mun, code, `(${province})`]
      .filter((item: string) => item !== undefined)
      .join(' ');
  }

}
