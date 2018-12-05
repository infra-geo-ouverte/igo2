import { ConfigService } from '@igo2/core';

import { ClientState } from 'src/app/state';
import { SearchSource } from './source';
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
