import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoFormModule } from '@igo2/common';

import { ClientSchemaCreateFormComponent } from './client-schema-create-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    IgoLanguageModule,
    IgoFormModule
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
