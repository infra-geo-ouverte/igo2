import { ConfigService } from '@igo2/core';
import { ApiService } from './api.service';

export function apiServiceFactory(config: ConfigService) {
  return new ApiService(config);
}

export function provideApiService() {
  return {
    provide: ApiService,
    useFactory: apiServiceFactory,
    deps: [ConfigService]
  };
}
