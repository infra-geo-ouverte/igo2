import { ConfigService } from '@igo2/core';
import { ApiService } from './api.service';

/**
 * API service factory
 * @ignore
 */
export function apiServiceFactory(config: ConfigService) {
  return new ApiService(config);
}

/**
 * Function that returns a provider for the API service
 */
export function provideApiService() {
  return {
    provide: ApiService,
    useFactory: apiServiceFactory,
    deps: [ConfigService]
  };
}
