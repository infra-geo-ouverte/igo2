import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { ApiService } from 'src/lib/core/api';
import { CadastreCadastreService } from './cadastre.service';

export function cadastreServiceFactory(
  http: HttpClient,
  apiService: ApiService,
  config: ConfigService
) {
  return new CadastreCadastreService(
    http,
    apiService,
    config.getConfig('cadastre.cadastre')
  );
}

export function provideCadastreService() {
  return {
    provide: CadastreCadastreService,
    useFactory: cadastreServiceFactory,
    deps: [HttpClient, ApiService, ConfigService]
  };
}
