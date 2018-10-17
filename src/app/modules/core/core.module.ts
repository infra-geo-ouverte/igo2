import { NgModule, ModuleWithProviders, Provider } from '@angular/core';

import {
  IgoCoreModule,
  RouteService,
  provideConfigOptions
} from '@igo2/core';
import { environment } from '../../../environments/environment';

import { FadqApiModule } from './api/api.module';

@NgModule({
  imports: [
    IgoCoreModule,
    FadqApiModule
  ],
  declarations: [],
  exports: [
    IgoCoreModule,
    FadqApiModule
  ]
})
export class FadqCoreModule {
  static forRoot(): ModuleWithProviders {
    const providers: Provider[] = [RouteService];

    if (!environment.production) {
      providers.push(provideConfigOptions({
        default: environment.igo,
        path: './config/config.json'
      }));
    }
    return {
      ngModule: FadqCoreModule,
      providers: providers
    };
  }
}
