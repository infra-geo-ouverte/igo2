import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { ClientSchemasTableComponent } from './client-schemas-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    IgoLanguageModule
  ],
  exports: [ClientSchemasTableComponent],
  declarations: [ClientSchemasTableComponent]
})
export class FadqClientSchemasTableModule {}
