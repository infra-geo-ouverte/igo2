import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibEntityFormModule } from 'src/lib/entity/entity-form/entity-form.module';

import { FeatureFormComponent } from './feature-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FadqLibEntityFormModule
  ],
  exports: [
    FeatureFormComponent
  ],
  declarations: [
    FeatureFormComponent
  ]
})
export class FadqLibFeatureFormModule {}
