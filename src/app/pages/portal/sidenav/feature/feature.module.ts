import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoFeatureDetailsModule } from './feature-details/feature-details.module';
import { IgoFeatureFormModule } from '@igo2/geo';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    IgoFeatureDetailsModule,
    IgoFeatureFormModule
  ],
  declarations: [],
  providers: []
})
export class IgoFeatureModule {}
