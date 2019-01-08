import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibWidgetOutletModule } from './widget-outlet/widget-outlet.module';
import { WidgetService } from './shared/widget.service';

@NgModule({
  imports: [
    CommonModule,
    FadqLibWidgetOutletModule
  ],
  exports: [
    FadqLibWidgetOutletModule
  ],
  declarations: [],
  providers: [
    WidgetService
  ]
})
export class FadqLibWidgetModule {}
