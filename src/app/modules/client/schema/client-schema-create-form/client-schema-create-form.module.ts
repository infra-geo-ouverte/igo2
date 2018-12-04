import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqEntityFormModule } from 'src/app/modules/entity/entity-form/entity-form.module';

import { ClientSchemaCreateFormComponent } from './client-schema-create-form.component';

@NgModule({
  imports: [
    CommonModule,
    FadqEntityFormModule
  ],
  exports: [
    ClientSchemaCreateFormComponent
  ],
  declarations: [
    ClientSchemaCreateFormComponent
  ],
  entryComponents: [
    ClientSchemaCreateFormComponent
  ]
})
export class FadqClientSchemaCreateFormModule {}
