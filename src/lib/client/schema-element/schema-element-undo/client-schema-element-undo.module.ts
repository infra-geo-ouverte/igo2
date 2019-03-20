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
  ClientSchemaElementUndoComponent
} from './client-schema-element-undo.component';

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
    ClientSchemaElementUndoComponent
  ],
  declarations: [
    ClientSchemaElementUndoComponent
  ],
  entryComponents: [
    ClientSchemaElementUndoComponent
  ]
})
export class FadqLibClientSchemaElementUndoModule {}
