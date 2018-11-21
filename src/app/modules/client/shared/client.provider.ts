import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { ApiService } from '../../core/api';
import { ClientInfoService } from './client-info.service';
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
