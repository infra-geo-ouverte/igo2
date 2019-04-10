import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { ApiService } from 'src/lib/core/api';
import { CadastreConcessionService } from './concession.service';

export function concessionServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new CadastreConcessionService(
    http,
    apiService,
    config.getConfig('cadastre.concession')
  );
}

export function provideConcessionService() {
  return {
    provide: CadastreConcessionService,
    useFactory: concessionServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}
