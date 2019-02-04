import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { ApiService } from 'src/lib/core/api';
import { ClientSchemaElementPointService } from './client-schema-element-point.service';
import { ClientSchemaElementLineService } from './client-schema-element-line.service';
import { ClientSchemaElementSurfaceService } from './client-schema-element-surface.service';
import { ClientSchemaElementService } from './client-schema-element.service';

/* Point */
export function clientSchemaElementPointServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientSchemaElementPointService(
    http,
    apiService,
    config.getConfig('client.api.schemaElement')
  );
}

export function provideClientSchemaElementPointService() {
  return {
    provide: ClientSchemaElementPointService,
    useFactory: clientSchemaElementPointServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}

/* Line */
export function clientSchemaElementLineServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientSchemaElementLineService(
    http,
    apiService,
    config.getConfig('client.api.schemaElement')
  );
}

export function provideClientSchemaElementLineService() {
  return {
    provide: ClientSchemaElementLineService,
    useFactory: clientSchemaElementLineServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}

/* Surface */
export function clientSchemaElementSurfaceServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientSchemaElementSurfaceService(
    http,
    apiService,
    config.getConfig('client.api.schemaElement')
  );
}

export function provideClientSchemaElementSurfaceService() {
  return {
    provide: ClientSchemaElementSurfaceService,
    useFactory: clientSchemaElementSurfaceServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}

export function clientSchemaElementServiceFactory(
  clientSchemaElementPointService: ClientSchemaElementPointService,
  clientSchemaElementLineService: ClientSchemaElementLineService,
  clientSchemaElementSurfaceService: ClientSchemaElementSurfaceService
) {
  return new ClientSchemaElementService(
    clientSchemaElementPointService,
    clientSchemaElementLineService,
    clientSchemaElementSurfaceService
  );
}

export function provideClientSchemaElementService() {
  return {
    provide: ClientSchemaElementService,
    useFactory: clientSchemaElementServiceFactory,
    deps: [
      ClientSchemaElementPointService,
      ClientSchemaElementLineService,
      ClientSchemaElementSurfaceService
    ]
  };
}
