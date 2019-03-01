import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoFormModule } from '@igo2/common';

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
    IgoFormModule,
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
