import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { FadqLibEntityFormModule } from 'src/lib/entity/entity-form/entity-form.module';
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
    IgoLanguageModule,
    FadqLibEntityFormModule,
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
