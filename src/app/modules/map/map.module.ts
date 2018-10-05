import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideProjectionService } from './shared/projection.provider'

import { FadqMapToolbarModule } from './map-toolbar/map-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FadqMapToolbarModule
  ],
  exports: [
    FadqMapToolbarModule
  ],
  declarations: []
})
export class FadqMapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqMapModule,
      providers: [provideProjectionService()]
    };
  }
}
