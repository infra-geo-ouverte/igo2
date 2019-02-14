import { HttpClient } from '@angular/common/http';

import { ConfigService, LanguageService } from '@igo2/core';

import { SearchSource } from './source';
import {
  IChercheSearchSource,
  IChercheSearchResultFormatter,
  IChercheReverseSearchSource
} from './icherche';

/**
 * ICherche search result formatter factory
 * @ignore
 */
export function defaultIChercheSearchResultFormatterFactory(
  languageService: LanguageService
) {
  return new IChercheSearchResultFormatter(languageService);
}

/**
 * Function that returns a provider for the ICherche search result formatter
 */
export function provideDefaultIChercheSearchResultFormatter() {
  return {
    provide: IChercheSearchResultFormatter,
    useFactory: defaultIChercheSearchResultFormatterFactory,
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
