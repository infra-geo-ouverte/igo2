import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { ApiService } from 'src/lib/core/api';

import { ClientSchemaFileService } from './client-schema-file.service';

export function clientSchemaFileServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientSchemaFileService(
    http,
    apiService,
    config.getConfig('client.api.schemaFile')
  );
}

export function provideClientSchemaFileService() {
  return {
    provide: ClientSchemaFileService,
    useFactory: clientSchemaFileServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}
