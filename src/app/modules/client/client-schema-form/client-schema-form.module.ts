import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqEntityFormModule } from '../../entity/entity-form/entity-form.module';

import { ClientSchemaFormComponent } from './client-schema-form.component';

@NgModule({
  imports: [
    CommonModule,
    FadqEntityFormModule
  ],
  exports: [
    ClientSchemaFormComponent
  ],
  declarations: [
    ClientSchemaFormComponent
  ],
  entryComponents: [
    ClientSchemaFormComponent
  ]
})
export class FadqClientSchemaFormModule {}
