import { HttpClient } from '@angular/common/http';

import { ConfigService, LanguageService } from '@igo2/core';
import {
  SearchSource,
  IChercheSearchSource,
  IChercheSearchResultFormatter,
  IChercheReverseSearchSource
} from '@igo2/geo';

import { FadqIChercheSearchResultFormatter } from './icherche';

/**
 * IMPORTANT: It appaers that we have to define our own providers for the search sources
 * to work properly (prod build only). Th providers are exactly like those in igo2-lib so that's weird.
 */

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
