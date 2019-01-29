import { ConfigService } from '@igo2/core';

import { SearchSource } from 'src/lib/search';

import { MapSearchSource } from './map';

/**
 * Map search source factory
 * @ignore
 */
export function mapSearchSourceFactory(
  config: ConfigService
) {
  return new MapSearchSource(
    config.getConfig(`searchSources.${MapSearchSource.id}`)
  );
}

/**
 * Function that returns a provider for the map search source
 */
export function provideMapSearchSource() {
  return {
    provide: SearchSource,
    useFactory: mapSearchSourceFactory,
    multi: true,
    deps: [ConfigService]
  };
}
