import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { FadqEntityTableModule } from 'src/app/modules/entity/entity-table/entity-table.module';

import { ClientSchemaFileManagerComponent } from './client-schema-file-manager.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    IgoLanguageModule,
    FadqEntityTableModule
  ],
  exports: [
    ClientSchemaFileManagerComponent
  ],
  declarations: [
    ClientSchemaFileManagerComponent
  ],
  entryComponents: [
    ClientSchemaFileManagerComponent
  ]
})
export class FadqClientSchemaFileManagerModule {}
