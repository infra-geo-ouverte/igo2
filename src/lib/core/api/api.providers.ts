import { ConfigService } from '@igo2/core';
import { ApiService } from './api.service';

/**
 * Function that returns a provider for the API service
 */
export function provideApiService() {
  return {
    provide: ApiService,
    useFactory: (config: ConfigService) => new ApiService(config),
    deps: [ConfigService]
  };
}
