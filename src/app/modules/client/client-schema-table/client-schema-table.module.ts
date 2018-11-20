import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoLanguageModule } from '@igo2/core';

import { FadqEntityModule } from '../../entity/entity.module';
import { ClientSchemaTableComponent } from './client-schema-table.component';

@NgModule({
  imports: [
    CommonModule,
    IgoLanguageModule,
    FadqEntityModule
  ],
  exports: [ClientSchemaTableComponent],
  declarations: [ClientSchemaTableComponent]
})
export class FadqClientSchemaTableModule {}
