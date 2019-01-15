import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { SearchSource } from './source';
import { IChercheSearchSource, IChercheReverseSearchSource } from './icherche';

/**
 * Function that returns a provider for the ICherche search source
 */
export function provideIChercheSearchSource() {
  return {
    provide: SearchSource,
    useFactory: (http: HttpClient, config: ConfigService) => {
      return new IChercheSearchSource(
        http,
        config.getConfig(`searchSources.${IChercheSearchSource.id}`)
      );
    },
    multi: true,
    deps: [HttpClient, ConfigService]
  };
}

/**
 * Function that returns a provider for the IChercheReverse search source
 */
export function provideIChercheReverseSearchSource() {
  return {
    provide: SearchSource,
    useFactory: (http: HttpClient, config: ConfigService) => {
      return new IChercheReverseSearchSource(
        http,
        config.getConfig(`searchSources.${IChercheReverseSearchSource.id}`)
      );
    },
    multi: true,
    deps: [HttpClient, ConfigService]
  };
}
