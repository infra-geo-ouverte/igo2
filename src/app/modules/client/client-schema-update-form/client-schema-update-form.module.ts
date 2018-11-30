import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqEntityFormModule } from '../../entity/entity-form/entity-form.module';

import { ClientSchemaUpdateFormComponent } from './client-schema-update-form.component';

@NgModule({
  imports: [
    CommonModule,
    FadqEntityFormModule
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
export class FadqClientSchemaUpdateFormModule {}
