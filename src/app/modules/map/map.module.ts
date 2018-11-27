import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqMapWidgetbarModule } from './map-widgetbar/map-widgetbar.module';

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
export class FadqMapModule {}
