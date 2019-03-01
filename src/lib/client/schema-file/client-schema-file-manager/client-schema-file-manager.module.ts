import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoEntityTableModule } from '@igo2/common';

import { ClientSchemaFileManagerComponent } from './client-schema-file-manager.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    IgoLanguageModule,
    IgoEntityTableModule
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
