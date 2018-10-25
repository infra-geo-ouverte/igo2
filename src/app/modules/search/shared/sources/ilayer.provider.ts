import { HttpClient } from '@angular/common/http';

import { ConfigService, LanguageService } from '@igo2/core';

import { SearchSource } from './source';
import { ILayerSearchSource } from './ilayer';

export function ilayerSearchSourcesFactory(
  http: HttpClient,
  config: ConfigService,
  languageService: LanguageService
) {
  return new ILayerSearchSource(
    config.getConfig(`searchSources.${ILayerSearchSource.id}`),
    http,
    languageService
  );
}

export function provideILayerSearchSource() {
  return {
    provide: SearchSource,
    useFactory: ilayerSearchSourcesFactory,
    multi: true,
    deps: [HttpClient, ConfigService, LanguageService]
  };
}
