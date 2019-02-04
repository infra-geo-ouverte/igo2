import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { FadqLibFormModule } from 'src/lib/form/form.module';
import { ClientSchemaDuplicateFormComponent } from './client-schema-duplicate-form.component';

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
    ClientSchemaDuplicateFormComponent
  ],
  declarations: [
    ClientSchemaDuplicateFormComponent
  ],
  entryComponents: [
    ClientSchemaDuplicateFormComponent
  ]
})
export class FadqLibClientSchemaDuplicateFormModule {}
