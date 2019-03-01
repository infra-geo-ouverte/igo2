import { NgModule, ModuleWithProviders, Provider } from '@angular/core';

import { IgoCoreModule, RouteService, provideConfigOptions } from '@igo2/core';

import { environment } from 'src/environments/environment';
import { FadqLibApiModule } from './api/api.module';

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
    FadqLibApiModule
  ],
  declarations: [],
  exports: [
    IgoCoreModule,
    FadqLibApiModule
  ]
})
export class FadqLibCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibCoreModule,
      providers: providers
    };
  }
}
