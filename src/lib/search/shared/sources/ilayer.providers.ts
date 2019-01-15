import { HttpClient } from '@angular/common/http';

import { ConfigService, LanguageService } from '@igo2/core';

import { SearchSource } from './source';
import { ILayerSearchSource } from './ilayer';

/**
 * Function that returns a provider for the ILayer search source
 */
export function provideILayerSearchSource() {
  return {
    provide: SearchSource,
    useFactory: (http: HttpClient, languageService: LanguageService, config: ConfigService) => {
      return new ILayerSearchSource(
        http,
        languageService,
        config.getConfig(`searchSources.${ILayerSearchSource.id}`)
      );
    },
    multi: true,
    deps: [HttpClient, LanguageService, ConfigService]
  };
}
