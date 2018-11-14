import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqMapToolbarModule } from './map-toolbar/map-toolbar.module';
import { MapService } from './shared/map.service';

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
      providers: [ MapService ]
    };
  }
}
