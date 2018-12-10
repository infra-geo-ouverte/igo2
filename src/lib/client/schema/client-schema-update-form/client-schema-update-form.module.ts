import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibEntityFormModule } from 'src/lib/entity/entity-form/entity-form.module';

import { ClientSchemaUpdateFormComponent } from './client-schema-update-form.component';

@NgModule({
  imports: [
    CommonModule,
    FadqLibEntityFormModule
  ],
  exports: [
    ClientSchemaUpdateFormComponent
  ],
  declarations: [
    ClientSchemaUpdateFormComponent
  ],
  entryComponents: [
    ClientSchemaUpdateFormComponent
  ]
})
export class FadqLibClientSchemaUpdateFormModule {}
