import { Injectable } from '@angular/core';

import {
  FeatureStore,
  VectorLayer,
  FeatureDataSource,
  FeatureStoreLoadingStrategy,
  FeatureStoreSelectionStrategy,
  tryBindStoreLayer,
  tryAddLoadingStrategy,
  FeatureMotion,
  tryAddSelectionStrategy,
} from '@igo2/geo';
import { MapState } from '@igo2/integration';

import { AddressFeature, createAddressStyle } from 'src/lib/address';


/**
 * Service that holds the state of the measure module
 */
@Injectable({
  providedIn: 'root'
})
export class AddressState {

  /**
   * Store that holds all the available Municipalities
   */
  get adressStore(): FeatureStore<AddressFeature> { return this._adressStore; }
  private _adressStore: FeatureStore<AddressFeature>;

  constructor(private mapState: MapState) {
    this.initAddressStore();
  }

  /**
   *Initialise a store of address
   *
   */
  initAddressStore() {
    this._adressStore = new FeatureStore<AddressFeature>([], {
      getKey: (entity: AddressFeature) => entity.properties.idAdresseLocalisee,
      map: this.mapState.map }
      );
  }
}
