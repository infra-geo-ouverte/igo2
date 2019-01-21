import { ConfigService } from '@igo2/core';

import { SearchSource } from 'src/lib/search';

import { ClientState } from 'src/app/modules/client/client.state';
import { ClientSearchSource } from './client';

/**
 * Client search source factory
 * @ignore
 */
export function clientSearchSourceFactory(
  clientState: ClientState,
  config: ConfigService
) {
  return new ClientSearchSource(
    clientState,
    config.getConfig(`searchSources.${ClientSearchSource.id}`)
  );
}

/**
 * Function that returns a provider for the client search source
 */
export function provideClientSearchSource() {
  return {
    provide: SearchSource,
    useFactory: clientSearchSourceFactory,
    multi: true,
    deps: [ClientState, ConfigService]
  };
}
