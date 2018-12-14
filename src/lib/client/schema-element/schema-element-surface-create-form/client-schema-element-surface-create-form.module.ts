import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibEntityFormModule } from 'src/lib/entity/entity-form/entity-form.module';

import {
  ClientSchemaElementSurfaceCreateFormComponent
} from './client-schema-element-surface-create-form.component';

@NgModule({
  imports: [
    CommonModule,
    FadqLibEntityFormModule
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
