import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibWidgetbarModule } from './widgetbar/widgetbar.module';

@NgModule({
  imports: [
    CommonModule,
    FadqLibWidgetbarModule
  ],
  exports: [
    FadqLibWidgetbarModule
  ],
  declarations: [],
  providers: []
})
export class FadqLibWidgetModule {}
