import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { ApiService } from 'src/lib/core/api';
import { CadastreMunService } from './mun.service';

export function munServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new CadastreMunService(
    http,
    apiService,
    config.getConfig('cadastre.mun')
  );
}

export function provideMunService() {
  return {
    provide: CadastreMunService,
    useFactory: munServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}
