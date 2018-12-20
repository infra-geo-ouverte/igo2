import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibFeatureFormModule } from 'src/lib/feature/feature-form/feature-form.module';

import {
  ClientSchemaElementSurfaceCreateFormComponent
} from './client-schema-element-surface-create-form.component';

@NgModule({
  imports: [
    CommonModule,
    FadqLibFeatureFormModule
  ],
  exports: [
    ClientSchemaElementSurfaceCreateFormComponent
  ],
  declarations: [
    ClientSchemaElementSurfaceCreateFormComponent
  ],
  entryComponents: [
    ClientSchemaElementSurfaceCreateFormComponent
  ]
})
export class FadqLibClientSchemaElementSurfaceCreateFormModule {}
