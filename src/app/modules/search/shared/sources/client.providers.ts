import { ConfigService } from '@igo2/core';

import { SearchSource } from 'src/lib/search';

import { ClientState } from 'src/app/modules/client/client.state';
import { ClientSearchSource } from './client';

export function clientSearchSourcesFactory(
  clientState: ClientState,
  config: ConfigService
) {
  return new ClientSearchSource(
    clientState,
    config.getConfig(`searchSources.${ClientSearchSource.id}`)
  );
}

export function provideClientSearchSource() {
  return {
    provide: SearchSource,
    useFactory: clientSearchSourcesFactory,
    multi: true,
    deps: [ClientState, ConfigService]
  };
}
