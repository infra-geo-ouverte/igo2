import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { AddressEditorSaveDialogComponent } from './address-editor-save-dialog.component';

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
  declarations: [AddressEditorSaveDialogComponent],
  exports: [AddressEditorSaveDialogComponent],
  entryComponents: [AddressEditorSaveDialogComponent]
})
export class FadqAddressEditorSaveDialogModule {}
