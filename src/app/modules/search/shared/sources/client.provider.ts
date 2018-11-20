import { ConfigService } from '@igo2/core';

import { ClientService } from '../../../client/shared/client.service';
import { SearchSource } from './source';
import { ClientSearchSource } from './client';

export function clientSearchSourcesFactory(
  config: ConfigService,
  clientService: ClientService
) {
  return new ClientSearchSource(
    config.getConfig(`searchSources.${ClientSearchSource.id}`),
    clientService
  );
}

export function provideClientSearchSource() {
  return {
    provide: SearchSource,
    useFactory: clientSearchSourcesFactory,
    multi: true,
    deps: [ConfigService, ClientService]
  };
}
