import { ConfigService } from '@igo2/core';

import { ProjectionService } from './projection.service';

export function projectionServiceFactory(config: ConfigService) {
  return new ProjectionService(config);
}

export function provideProjectionService() {
  return {
    provide: ProjectionService,
    useFactory: projectionServiceFactory,
    deps: [ConfigService]
  };
}
