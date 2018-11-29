import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { ApiService } from 'src/app/modules/core/api';
import { ClientInfoService } from './client-info.service';
import { ClientParcelService } from './client-parcel.service';
import { ClientParcelYearService } from './client-parcel-year.service';
import { ClientSchemaService } from './client-schema.service';
import { ClientService } from './client.service';

export function clientInfoServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientInfoService(
    http,
    apiService,
    config.getConfig('client.api')
  );
}

export function provideClientInfoService() {
  return {
    provide: ClientInfoService,
    useFactory: clientInfoServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}

export function clientParcelServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientParcelService(
    http,
    apiService,
    config.getConfig('client.api')
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
    config.getConfig('client.api')
  );
}

export function provideClientParcelYearService() {
  return {
    provide: ClientParcelYearService,
    useFactory: clientParcelYearServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}

export function clientSchemaServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientSchemaService(
    http,
    apiService,
    config.getConfig('client.api')
  );
}

export function provideClientSchemaService() {
  return {
    provide: ClientSchemaService,
    useFactory: clientSchemaServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}

export function clientServiceFactory(
  clientInfoService: ClientInfoService,
  clientParcelService: ClientParcelService,
  clientSchemaService: ClientSchemaService
) {
  return new ClientService(
    clientInfoService,
    clientParcelService,
    clientSchemaService
  );
}

export function provideClientService() {
  return {
    provide: ClientService,
    useFactory: clientServiceFactory,
    deps: [
      ClientInfoService,
      ClientParcelService,
      ClientSchemaService
    ]
  };
}
