import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@igo2/core';

import { SearchSource } from '@igo2/geo';
import {
  ReseauTransportQuebecReverseSearchSource,
  ReseauTransportQuebecSearchSource,
  ReseauTransportQuebecSearchResultFormatter
} from './reseau-transport-quebec';

/**
 * ReseauTransportQuebec search result formatter factory
 * @ignore
 */
export function defaultReseauTransportQuebecSearchResultFormatterFactory() {
  return new ReseauTransportQuebecSearchResultFormatter();
}

/**
 * Function that returns a provider for the ReseauTransportQuebec search result formatter
 */
export function provideDefaultReseauTransportQuebecSearchResultFormatter() {
  return {
    provide: ReseauTransportQuebecSearchResultFormatter,
    useFactory: defaultReseauTransportQuebecSearchResultFormatterFactory
  };
}

/**
 * ReseauTransportQuebec search source factory
 * @ignore
 */
export function reseauTransportQuebecSearchSourceFactory(
  http: HttpClient,
  config: ConfigService,
  formatter: ReseauTransportQuebecSearchResultFormatter
) {
  return new ReseauTransportQuebecSearchSource(
    http,
    config.getConfig(`searchSources.${ReseauTransportQuebecSearchSource.id}`),
    formatter
  );
}

/**
 * Function that returns a provider for the ReseauTransportQuebec search source
 */
export function provideReseauTransportQuebecSearchSource() {
  return {
    provide: SearchSource,
    useFactory: reseauTransportQuebecSearchSourceFactory,
    multi: true,
    deps: [HttpClient, ConfigService, ReseauTransportQuebecSearchResultFormatter]
  };
}

/**
 * ReseauTransportQuebecReverse search source factory
 * @ignore
 */
export function reseauTransportQuebecReverseSearchSourceFactory(
  http: HttpClient,
  config: ConfigService,
  formatter: ReseauTransportQuebecSearchResultFormatter
) {
  return new ReseauTransportQuebecReverseSearchSource(
    http,
    config.getConfig(`searchSources.${ReseauTransportQuebecReverseSearchSource.id}`),
    formatter
  );
}

/**
 * Function that returns a provider for the ReseauTransportQuebecReverse search source
 */
export function provideReseauTransportQuebecReverseSearchSource() {
  return {
    provide: SearchSource,
    useFactory: reseauTransportQuebecReverseSearchSourceFactory,
    multi: true,
    deps: [HttpClient, ConfigService, ReseauTransportQuebecSearchResultFormatter]
  };
}
