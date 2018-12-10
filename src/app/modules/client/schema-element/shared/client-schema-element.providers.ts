import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { ApiService } from 'src/app/modules/core/api';
import { ClientSchemaElementSurfaceService } from './client-schema-element-surface.service';

export function clientSchemaElementSurfaceServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientSchemaElementSurfaceService(
    http,
    apiService,
    config.getConfig('client.api.schema.element.surface')
  );
}

export function provideClientSchemaElementSurfaceService() {
  return {
    provide: ClientSchemaElementSurfaceService,
    useFactory: clientSchemaElementSurfaceServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}
