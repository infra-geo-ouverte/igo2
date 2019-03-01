import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoEntityTableModule, IgoFormModule } from '@igo2/common';

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
    IgoFormModule,
    IgoEntityTableModule
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
