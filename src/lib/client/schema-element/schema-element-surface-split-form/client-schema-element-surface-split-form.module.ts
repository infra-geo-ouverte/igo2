import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibFeatureFormModule } from 'src/lib/feature/feature-form/feature-form.module';

import {
  ClientSchemaElementSurfaceSplitFormComponent
} from './client-schema-element-surface-split-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FadqLibFeatureFormModule
  ],
  exports: [
    ClientSchemaElementSurfaceSplitFormComponent
  ],
  declarations: [
    ClientSchemaElementSurfaceSplitFormComponent
  ],
  entryComponents: [
    ClientSchemaElementSurfaceSplitFormComponent
  ]
})
export class FadqLibClientSchemaElementSurfaceSplitFormModule {}
