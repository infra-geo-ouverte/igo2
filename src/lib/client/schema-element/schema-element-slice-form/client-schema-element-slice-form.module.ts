import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoFeatureFormModule } from '@igo2/geo';

import {
  ClientSchemaElementSliceFormComponent
} from './client-schema-element-slice-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    IgoFeatureFormModule
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
