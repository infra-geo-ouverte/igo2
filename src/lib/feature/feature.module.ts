import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibFeatureFormModule } from './feature-form/feature-form.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibFeatureFormModule
  ],
  declarations: [],
  providers: []
})
export class FadqLibFeatureModule {}
