import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { ClientSchemaConfirmDialogComponent } from './client-schema-confirm-dialog.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    IgoLanguageModule
  ],
  declarations: [ClientSchemaConfirmDialogComponent],
  exports: [ClientSchemaConfirmDialogComponent],
  entryComponents: [ClientSchemaConfirmDialogComponent]
})
export class FadqClientSchemaConfirmDialogModule {}
