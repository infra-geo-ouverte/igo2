import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibEntityFormModule } from 'src/lib/entity/entity-form/entity-form.module';

import {
  ClientSchemaElementSurfaceUpdateFormComponent
} from './client-schema-element-surface-update-form.component';

@NgModule({
  imports: [
    CommonModule,
    FadqLibEntityFormModule
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
