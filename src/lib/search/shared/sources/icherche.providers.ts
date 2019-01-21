import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { SearchSource } from './source';
import { IChercheSearchSource, IChercheReverseSearchSource } from './icherche';

/**
 * ICherche search source factory
 * @ignore
 */
export function ichercheSearchSourceFactory(
  http: HttpClient,
  config: ConfigService
) {
  return new IChercheSearchSource(
    http,
    config.getConfig(`searchSources.${IChercheSearchSource.id}`)
  );
}

/**
 * Function that returns a provider for the ICherche search source
 */
export function provideIChercheSearchSource() {
  return {
    provide: SearchSource,
    useFactory: ichercheSearchSourceFactory,
    multi: true,
    deps: [HttpClient, ConfigService]
  };
}

/**
 * IChercheReverse search source factory
 * @ignore
 */
export function ichercheReverseSearchSourceFactory(
  http: HttpClient,
  config: ConfigService
) {
  return new IChercheReverseSearchSource(
    http,
    config.getConfig(`searchSources.${IChercheReverseSearchSource.id}`)
  );
}

/**
 * Function that returns a provider for the IChercheReverse search source
 */
export function provideIChercheReverseSearchSource() {
  return {
    provide: SearchSource,
    useFactory: ichercheReverseSearchSourceFactory,
    multi: true,
    deps: [HttpClient, ConfigService]
  };
}
