import { HttpClient } from '@angular/common/http';

import { ConfigService, LanguageService } from '@igo2/core';
import { SearchSource, IChercheSearchSource, IChercheSearchResultFormatter } from '@igo2/geo';

import { FadqIChercheSearchResultFormatter } from './icherche';

/**
 * ICherche search source factory
 * @ignore
 */
export function fadqIChercheSearchResultFormatterFactory(
  languageService: LanguageService
) {
  return new FadqIChercheSearchResultFormatter(languageService);
}

/**
 * Function that returns a provider for the ICherche search source
 */
export function provideFadqIChercheSearchResultFormatter() {
  return {
    provide: IChercheSearchResultFormatter,
    useFactory: fadqIChercheSearchResultFormatterFactory,
    deps: [LanguageService]
  };
}

/**
 * ICherche search source factory
 * @ignore
 */
export function ichercheSearchSourceFactory(
  http: HttpClient,
  config: ConfigService,
  formatter: IChercheSearchResultFormatter
) {
  return new IChercheSearchSource(
    http,
    config.getConfig(`searchSources.${IChercheSearchSource.id}`),
    formatter
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
    deps: [HttpClient, ConfigService, IChercheSearchResultFormatter]
  };
}
