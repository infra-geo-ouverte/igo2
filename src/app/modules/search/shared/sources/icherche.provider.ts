import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { SearchSource } from './source';
import { IChercheSearchSource } from './icherche';

export function ichercheSearchSourcesFactory(
  http: HttpClient,
  config: ConfigService
) {
  return new IChercheSearchSource(
    config.getConfig(`searchSources.${IChercheSearchSource.id}`),
    http
  );
}

export function provideIChercheSearchSource() {
  return {
    provide: SearchSource,
    useFactory: ichercheSearchSourcesFactory,
    multi: true,
    deps: [HttpClient, ConfigService]
  };
}
