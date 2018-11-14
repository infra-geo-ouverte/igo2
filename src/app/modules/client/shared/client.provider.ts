import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { ApiService } from '../../core/api';
import { ClientInfoService } from './client-info.service';
import { ClientSchemaService } from './client-schema.service';
import { ClientService } from './client.service';

export function clientInfoServiceFactory(
  http: HttpClient,
  config: ConfigService,
  apiService: ApiService
) {
  return new ClientInfoService(
    http,
    config.getConfig('client.api'),
    apiService
  );
}

export function provideClientInfoService() {
  return {
    provide: ClientInfoService,
    useFactory: clientInfoServiceFactory,
    deps: [HttpClient, ConfigService, ApiService]
  };
}

export function clientSchemaServiceFactory(
  http: HttpClient,
  config: ConfigService,
  apiService: ApiService
) {
  return new ClientSchemaService(
    http,
    config.getConfig('client.api'),
    apiService
  );
}

export function provideClientSchemaService() {
  return {
    provide: ClientSchemaService,
    useFactory: clientSchemaServiceFactory,
    deps: [HttpClient, ConfigService, ApiService]
  };
}

export function clientServiceFactory(
  clientInfoService: ClientInfoService,
  clientSchemaService: ClientSchemaService
) {
  return new ClientService(
    clientInfoService,
    clientSchemaService
  );
}

export function provideClientService() {
  return {
    provide: ClientService,
    useFactory: clientServiceFactory,
    deps: [
      ClientInfoService,
      ClientSchemaService
    ]
  };
}
