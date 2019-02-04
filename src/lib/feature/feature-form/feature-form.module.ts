import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibFormModule } from 'src/lib/form/form.module';

import { FeatureFormComponent } from './feature-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FadqLibFormModule
  ],
  exports: [
    FadqLibFormModule,
    FeatureFormComponent
  ],
  declarations: [
    FeatureFormComponent
  ]
})
export class FadqLibFeatureFormModule {}
