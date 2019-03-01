import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoMapModule } from '@igo2/geo';
import { FadqLibMapActionbarModule } from './map-actionbar/map-actionbar.module';

@NgModule({
  imports: [
    CommonModule,
    FadqLibMapActionbarModule
  ],
  exports: [
    IgoMapModule,
    FadqLibMapActionbarModule
  ],
  declarations: []
})
export class FadqLibMapModule {}
