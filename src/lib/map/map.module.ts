import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibMapWidgetbarModule } from './map-widgetbar/map-widgetbar.module';

@NgModule({
  imports: [
    CommonModule,
    FadqLibMapWidgetbarModule
  ],
  exports: [
    FadqLibMapWidgetbarModule
  ],
  declarations: []
})
export class FadqLibMapModule {}
