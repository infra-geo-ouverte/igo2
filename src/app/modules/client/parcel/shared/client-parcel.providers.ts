import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { ApiService } from 'src/app/modules/core/api';

import { ClientParcelService } from './client-parcel.service';
import { ClientParcelYearService } from './client-parcel-year.service';


export function clientParcelServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientParcelService(
    http,
    apiService,
    config.getConfig('client.api.parcel')
  );
}

export function provideClientParcelService() {
  return {
    provide: ClientParcelService,
    useFactory: clientParcelServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}

export function clientParcelYearServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientParcelYearService(
    http,
    apiService,
    config.getConfig('client.api.parcel')
  );
}

export function provideClientParcelYearService() {
  return {
    provide: ClientParcelYearService,
    useFactory: clientParcelYearServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}
