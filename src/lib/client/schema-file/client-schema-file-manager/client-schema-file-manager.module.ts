import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { FadqLibEntityTableModule } from 'src/lib/entity/entity-table/entity-table.module';

import { ClientSchemaFileManagerComponent } from './client-schema-file-manager.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    IgoLanguageModule,
    FadqLibEntityTableModule
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
export class FadqLibClientSchemaFileManagerModule {}
