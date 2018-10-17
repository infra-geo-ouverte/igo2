import { NgModule, ModuleWithProviders, Provider } from '@angular/core';

import {
  IgoCoreModule,
  RouteService,
  provideConfigOptions
} from '@igo2/core';
import { environment } from '../../../environments/environment';

import { FadqApiModule } from './api/api.module';

const providers: Provider[] = [
  RouteService,
  provideConfigOptions({
    default: environment.igo,
    path: './config/config.json'
  })
];

@NgModule({
  imports: [
    IgoCoreModule.forRoot(),
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
    return {
      ngModule: FadqCoreModule,
      providers: providers
    };
  }
}
