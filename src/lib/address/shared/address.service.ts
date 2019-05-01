import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeoJSONGeometry } from '@igo2/geo';

import { ApiService } from 'src/lib/core/api';

import {
  AddressApiConfig,
  AddressFeature,
  AddressFeatureResponseItem
} from './address.interface';

@Injectable()
export class AddressService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('addressApiConfig') private apiConfig: AddressApiConfig
  ) {}


  /**
   * Gets address features by extent
   * @param featureExtent A feature of the extent of the view map
   * @returns address All features addresses in relation with the extent
   */
  getAddressesByGeometry(geometry: GeoJSONGeometry): Observable<AddressFeature[]> {
    const url = this.apiService.buildUrl(this.apiConfig.list);
    return this.http
      .post(url, geometry)
      .pipe(
        map((response: AddressFeatureResponseItem[]) => {
          return this.extractAddressesFromListResponse(response);
        })
      );
  }

  /**
   * Extract all addresses in a list from the response service
   * @param AddressFeatureListResponse A list of addresses
   * @returns List of Features addresses
   */
  private extractAddressesFromListResponse(
    response: AddressFeatureResponseItem[]
  ): AddressFeatureResponseItem[] {
    return response.map(item => this.listItemToAddressFeatures(item));
  }

  private listItemToAddressFeatures(
    response: AddressFeatureResponseItem
  ): AddressFeature {
    const properties = Object.assign({}, response.properties);

    return {
      meta: {
        id: properties.idAdresseLocalisee,
        mapTitle: properties.noAdresse + properties.suffixeNoCivique
      },
      type: response.type,
      projection: 'EPSG:4326',
      geometry: response.geometry,
      extent: undefined,
      properties
    };
  }



  /**
   * Modify the geometry of an address
   * @param idAdresseLocalisee id of the address to modify
   * @param addressModified modified geometry of the address
   * @returns An observable
   */
  modifyAddressGeometry(idAdresseLocalisee: string, addressModified: AddressFeature): Observable<object> {
    const url = this.apiService.buildUrl(this.apiConfig.save, {idAdresseAQ: idAdresseLocalisee});
    return this.http.put(url, {
      geometriePoint: {
        type: addressModified.type,
        properties: addressModified.properties,
        geometry: addressModified.geometry
      }
    });
  }
}
