import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibFeatureFormModule } from 'src/lib/feature/feature-form/feature-form.module';

import {
  ClientSchemaElementSliceFormComponent
} from './client-schema-element-slice-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FadqLibFeatureFormModule
  ],
  exports: [
    ClientSchemaElementSliceFormComponent
  ],
  declarations: [
    ClientSchemaElementSliceFormComponent
  ],
  entryComponents: [
    ClientSchemaElementSliceFormComponent
  ]
})
export class FadqLibClientSchemaElementSliceFormModule {}
