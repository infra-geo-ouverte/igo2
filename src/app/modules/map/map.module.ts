import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideProjectionService } from './shared/projection.provider'

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
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
