import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { FadqLibEntityFormModule } from 'src/lib/entity/entity-form/entity-form.module';

import { ClientSchemaDuplicateFormComponent } from './client-schema-duplicate-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    IgoLanguageModule,
    FadqLibEntityFormModule
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
