import { ConfigService } from '@igo2/core';

import { ClientService } from '../../../client/shared/client.service';
import { SearchSource } from './source';
import { ClientSearchSource } from './client';

export function clientSearchSourcesFactory(
  clientService: ClientService,
  config: ConfigService
) {
  return new ClientSearchSource(
    clientService,
    config.getConfig(`searchSources.${ClientSearchSource.id}`)
  );
}

export function provideClientSearchSource() {
  return {
    provide: SearchSource,
    useFactory: clientSearchSourcesFactory,
    multi: true,
    deps: [ClientService, ConfigService]
  };
}
