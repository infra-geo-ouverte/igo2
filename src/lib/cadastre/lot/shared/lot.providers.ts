import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { ApiService } from 'src/lib/core/api';
import { CadastreLotService } from './lot.service';

export function lotServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new CadastreLotService(
    http,
    apiService,
    config.getConfig('cadastre.lot')
  );
}

export function provideLotService() {
  return {
    provide: CadastreLotService,
    useFactory: lotServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}
