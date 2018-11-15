import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoLanguageModule } from '@igo2/core';

import { FadqEntityModule } from '../../entity/entity.module';
import { ClientSchemasTableComponent } from './client-schemas-table.component';

@NgModule({
  imports: [
    CommonModule,
    IgoLanguageModule,
    FadqEntityModule
  ],
  exports: [ClientSchemasTableComponent],
  declarations: [ClientSchemasTableComponent]
})
export class FadqClientSchemasTableModule {}
