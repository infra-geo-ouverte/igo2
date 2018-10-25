import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { SearchSource } from './source';
import { NominatimSearchSource } from './nominatim';

export function nominatimSearchSourcesFactory(
  http: HttpClient,
  config: ConfigService
) {
  return new NominatimSearchSource(
    config.getConfig(`searchSources.${NominatimSearchSource.id}`),
    http
  );
}

export function provideNominatimSearchSource() {
  return {
    provide: SearchSource,
    useFactory: nominatimSearchSourcesFactory,
    multi: true,
    deps: [HttpClient, ConfigService]
  };
}
