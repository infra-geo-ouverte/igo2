import { HttpClient } from '@angular/common/http';

import { ConfigService, LanguageService } from '@igo2/core';

import { SearchSource } from './source';
import { ILayerSearchSource } from './ilayer';

export function ilayerSearchSourcesFactory(
  http: HttpClient,
  languageService: LanguageService,
  config: ConfigService
) {
  return new ILayerSearchSource(
    http,
    languageService,
    config.getConfig(`searchSources.${ILayerSearchSource.id}`)
  );
}

export function provideILayerSearchSource() {
  return {
    provide: SearchSource,
    useFactory: ilayerSearchSourcesFactory,
    multi: true,
    deps: [HttpClient, LanguageService, ConfigService]
  };
}
