import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { FadqEntityFormModule } from 'src/app/modules/entity/entity-form/entity-form.module';

import { ClientSchemaDeleteFormComponent } from './client-schema-delete-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    IgoLanguageModule,
    FadqEntityFormModule
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
export class FadqClientSchemaDeleteFormModule {}
