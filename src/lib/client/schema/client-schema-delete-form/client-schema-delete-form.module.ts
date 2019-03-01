import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoFormModule } from '@igo2/common';

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
    IgoFormModule,
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
