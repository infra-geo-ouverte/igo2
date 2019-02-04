import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { FadqLibFormModule } from 'src/lib/form/form.module';

import { ClientSchemaCreateFormComponent } from './client-schema-create-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    IgoLanguageModule,
    FadqLibFormModule
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
