import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { FadqLibFormModule } from 'src/lib/form/form.module';

import { ClientSchemaDeleteFormComponent } from './client-schema-delete-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    IgoLanguageModule,
    FadqLibFormModule,
  ],
  exports: [
    ClientSchemaDeleteFormComponent
  ],
  declarations: [
    ClientSchemaDeleteFormComponent
  ],
  entryComponents: [
    ClientSchemaDeleteFormComponent
  ]
})
export class FadqLibClientSchemaDeleteFormModule {}
