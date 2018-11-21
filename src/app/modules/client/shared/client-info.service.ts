import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../../core/api';
import {
  ClientInfo,
  ClientApiConfig,
  ClientInfoListResponse,
  ClientInfoListResult
} from './client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('apiConfig') private apiConfig: ClientApiConfig
  ) {}

  getClientInfoByNum(clientNum: string): Observable<ClientInfo> {
    const url = this.apiService.buildUrl(this.apiConfig.info);
    const params = new HttpParams({
      fromObject: {
        body: [clientNum]
      }
    });

    /*
    return this.http
      .post(url, { params })
      .pipe(
        map((response: ClientResponse) => {
          return this.extractClientFromResponse(response);
        })
      );
    */
   return of({
      'messages': [],
      'donnees': [
        {
          'numeroClient': '0007229',
          'nomClient': '0007229 CLIENT NUMÉRO',
          'statutJuridique': {
            'statutJuridique': 'Particulier',
            'codeStatutJuridique': '01'
          },
          'adresseCorrespondance': '448 rang 3 Est',
          'suiteAdresseCorrespondance': null,
          'municipaliteAdresseCorrespondance': 'Saint-Octave-de-Métis',
          'provinceAdresseCorrespondance': {
            'province': 'Québec',
            'codeProvince': 'QC'
          },
          'paysAdresseCorrespondance': {
            'pays': 'Canada',
            'codePays': 'CAN'
          },
          'codePostalAdresseCorrespondance': 'G0J 3B0',
          'langue': 'F',
          'centreServiceResponsable': {
            'noCentreServiceResponsable': '0997627',
            'nomCentreServiceResponsable': 'Centre de services de Rimouski'
          }
        }
      ]
    }).pipe(
      map((response: ClientInfoListResponse) => {
        return this.extractClientInfoFromResponse(response);
      })
    );
  }

  private extractClientInfoFromResponse(response: ClientInfoListResponse): ClientInfo | undefined {
    const results = response.donnees || [];
    if (results.length === 0 ) {
      return;
    }

    const result = results[0];
    return {
      numero: result.numeroClient,
      nom: result.nomClient,
      adresseCor: this.extractAddressFromResult(result, 'Correspondance'),
      adresseExp: this.extractAddressFromResult(result, 'Exploitation'),
      adressePro: this.extractAddressFromResult(result, 'Production')
    };
  }

  private extractAddressFromResult(result: ClientInfoListResult, suffix: string) {
    const no = result[`adresse${suffix}`];
    const suite = result[`suiteAdresse${suffix}`];
    const mun = result[`municipaliteAdresse${suffix}`];
    const code = result[`codePostalAdresse${suffix}`];
    const province = result[`provinceAdresse${suffix}`] || {};
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
