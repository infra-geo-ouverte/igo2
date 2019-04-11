import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@igo2/core';
import { SearchSource } from '@igo2/geo';
import { CadastreRenoSearchSource } from './cadastre-reno';

/**
 * CadastreReno search source factory
 * @ignore
 */
export function cadastreRenoSearchSourceFactory(
  http: HttpClient,
  config: ConfigService
) {
  return new CadastreRenoSearchSource(
    http,
    config.getConfig(`searchSources.${CadastreRenoSearchSource.id}`)
  );
}

/**
 * Function that returns a provider for the client search source
 */
export function provideCadastreRenoSearchSource() {
  return {
    provide: SearchSource,
    useFactory: cadastreRenoSearchSourceFactory,
    multi: true,
    deps: [HttpClient, ConfigService]
  };
}
