import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/modules/core/api';
import {
  ClientInfo,
  ClientInfoApiConfig,
  ClientInfoListResponse,
  ClientInfoListResponseItem
} from './client-info.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('clientInfoApiConfig') private apiConfig: ClientInfoApiConfig
  ) {}

  getClientInfoByNum(clientNum: string): Observable<ClientInfo> {
    const url = this.apiService.buildUrl(this.apiConfig.get);
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
          return this.extractClientFromListResponse(response);
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
        return this.extractClientInfoFromListResponse(response);
      })
    );
  }

  private extractClientInfoFromListResponse(response: ClientInfoListResponse): ClientInfo | undefined {
    const listItems = response.donnees || [];
    if (listItems.length === 0 ) {
      return;
    }

    const listItem = listItems[0];
    return {
      numero: listItem.numeroClient,
      nom: listItem.nomClient,
      adresseCor: this.extractAddressFromListItem(listItem, 'Correspondance'),
      adresseExp: this.extractAddressFromListItem(listItem, 'Exploitation'),
      adressePro: this.extractAddressFromListItem(listItem, 'Production')
    };
  }

  private extractAddressFromListItem(listItem: ClientInfoListResponseItem, suffix: string) {
    const no = listItem[`adresse${suffix}`];
    const suite = listItem[`suiteAdresse${suffix}`];
    const mun = listItem[`municipaliteAdresse${suffix}`];
    const code = listItem[`codePostalAdresse${suffix}`];
    const province = listItem[`provinceAdresse${suffix}`] || {};
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
