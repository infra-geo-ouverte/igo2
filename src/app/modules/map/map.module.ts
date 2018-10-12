import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqMapToolbarModule } from './map-toolbar/map-toolbar.module';

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
export class FadqMapModule {}
