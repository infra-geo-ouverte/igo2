import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FadqLibDynamicOutletModule
} from 'src/lib/common/dynamic-outlet/dynamic-outlet.module';

import { WidgetOutletComponent } from './widget-outlet.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FadqLibDynamicOutletModule
  ],
  exports: [
    WidgetOutletComponent
  ],
  declarations: [
    WidgetOutletComponent
  ]
})
export class FadqLibWidgetOutletModule {}
