import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqMapWidgetbarModule } from './map-widgetbar/map-widgetbar.module';
import { MapService } from './shared/map.service';

@NgModule({
  imports: [
    CommonModule,
    FadqMapWidgetbarModule
  ],
  exports: [
    FadqMapWidgetbarModule
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
