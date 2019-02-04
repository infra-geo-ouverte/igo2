import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { FadqLibFormModule } from 'src/lib/form/form.module';
import { FadqLibEntityTableModule } from 'src/lib/entity/entity-table/entity-table.module';

import {
  ClientSchemaElementSaverComponent
} from './client-schema-element-saver.component';

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
    FadqLibEntityTableModule
  ],
  exports: [
    ClientSchemaElementSaverComponent
  ],
  declarations: [
    ClientSchemaElementSaverComponent
  ],
  entryComponents: [
    ClientSchemaElementSaverComponent
  ]
})
export class FadqLibClientSchemaElementSaverModule {}
