import { ConfigService} from '@igo2/core';
import { SearchSource, QuerySearchSource } from '@igo2/geo';

/**
 * Query search source factory
 * @ignore
 */
export function querySearchSourceFactory(
  config: ConfigService
) {
  return new QuerySearchSource(
    config.getConfig(`searchSources.${QuerySearchSource.id}`)
  );
}

/**
 * Function that returns a provider for the Query search source
 */
export function provideQuerySearchSource() {
  return {
    provide: SearchSource,
    useFactory: querySearchSourceFactory,
    multi: true,
    deps: [ConfigService]
  };
}
