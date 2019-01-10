import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibEntityFormModule } from 'src/lib/entity/entity-form/entity-form.module';

import { ClientSchemaCreateFormComponent } from './client-schema-create-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FadqLibEntityFormModule
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
export class FadqLibClientSchemaCreateFormModule {}
