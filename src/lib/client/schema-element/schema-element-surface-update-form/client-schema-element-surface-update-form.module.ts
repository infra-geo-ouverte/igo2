import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibFeatureFormModule } from 'src/lib/feature/feature-form/feature-form.module';

import {
  ClientSchemaElementSurfaceUpdateFormComponent
} from './client-schema-element-surface-update-form.component';

@NgModule({
  imports: [
    CommonModule,
    FadqLibFeatureFormModule
  ],
  exports: [
    ClientSchemaElementSurfaceUpdateFormComponent
  ],
  declarations: [
    ClientSchemaElementSurfaceUpdateFormComponent
  ],
  entryComponents: [
    ClientSchemaElementSurfaceUpdateFormComponent
  ]
})
export class FadqLibClientSchemaElementSurfaceUpdateFormModule {}
