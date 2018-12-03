import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { ApiService } from 'src/app/modules/core/api';
import { ClientInfoService } from './client-info.service';

export function clientInfoServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new ClientInfoService(
    http,
    apiService,
    config.getConfig('client.api.info')
  );
}

export function provideClientInfoService() {
  return {
    provide: ClientInfoService,
    useFactory: clientInfoServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}
