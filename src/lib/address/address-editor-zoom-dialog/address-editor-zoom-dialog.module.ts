import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { AddressEditorZoomDialogComponent } from './address-editor-zoom-dialog.component';

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
  declarations: [AddressEditorZoomDialogComponent],
  exports: [AddressEditorZoomDialogComponent],
  entryComponents: [AddressEditorZoomDialogComponent]
})
export class FadqAddressEditorZoomDialogModule {}
