import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { ApiService } from 'src/lib/core/api';
import { AddressService } from './address.service';

export function addressServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new AddressService(
    http,
    apiService,
    config.getConfig('address')
  );
}

export function provideAddressService() {
  return {
    provide: AddressService,
    useFactory: addressServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}
