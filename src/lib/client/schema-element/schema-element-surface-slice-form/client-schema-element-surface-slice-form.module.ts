import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibFeatureFormModule } from 'src/lib/feature/feature-form/feature-form.module';

import {
  ClientSchemaElementSurfaceSliceFormComponent
} from './client-schema-element-surface-slice-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FadqLibFeatureFormModule
  ],
  exports: [
    ClientSchemaElementSurfaceSliceFormComponent
  ],
  declarations: [
    ClientSchemaElementSurfaceSliceFormComponent
  ],
  entryComponents: [
    ClientSchemaElementSurfaceSliceFormComponent
  ]
})
export class FadqLibClientSchemaElementSurfaceSliceFormModule {}
