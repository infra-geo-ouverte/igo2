import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibMapActionbarModule } from './map-actionbar/map-actionbar.module';

@NgModule({
  imports: [
    CommonModule,
    FadqLibMapActionbarModule
  ],
  exports: [
    FadqLibMapActionbarModule
  ],
  declarations: []
})
export class FadqLibMapModule {}
