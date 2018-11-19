import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoGeoModule } from '@igo2/geo';

import { FadqWidgetModule } from '../../widget/widget.module';
import { MapWidgetbarComponent } from './map-widgetbar.component';

@NgModule({
  imports: [
    CommonModule,
    IgoGeoModule,
    FadqWidgetModule
  ],
  exports: [MapWidgetbarComponent],
  declarations: [MapWidgetbarComponent]
})
export class FadqMapWidgetbarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqMapWidgetbarModule
    };
  }
}
