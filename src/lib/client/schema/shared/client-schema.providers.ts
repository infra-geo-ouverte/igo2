import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { ApiService } from 'src/lib/core/api';

import { ClientSchemaService } from './client-schema.service';
import { ClientSchemaFormService } from './client-schema-form.service';

export function clientSchemaServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientSchemaService(
    http,
    apiService,
    config.getConfig('client.api.schema')
  );
}

export function provideClientSchemaService() {
  return {
    provide: ClientSchemaService,
    useFactory: clientSchemaServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}

export function clientSchemaFormServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientSchemaFormService(
    http,
    apiService,
    config.getConfig('client.api.schema')
  );
}

export function provideClientSchemaFormService() {
  return {
    provide: ClientSchemaFormService,
    useFactory: clientSchemaFormServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}
