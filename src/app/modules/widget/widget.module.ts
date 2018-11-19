import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqWidgetbarModule } from './widgetbar/widgetbar.module';

@NgModule({
  imports: [
    CommonModule,
    FadqWidgetbarModule
  ],
  exports: [
    FadqWidgetbarModule
  ],
  declarations: [],
  providers: []
})
export class FadqWidgetModule {}
