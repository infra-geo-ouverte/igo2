import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { AddressEditorComponent } from './address-editor.component';
import { FadqAddressEditorSaveDialogModule } from '../address-editor-save-dialog/address-editor-save-dialog.module';
import { FadqAddressEditorZoomDialogModule } from '../address-editor-zoom-dialog/address-editor-zoom-dialog.module';


/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    IgoLanguageModule,
    FadqAddressEditorSaveDialogModule,
    FadqAddressEditorZoomDialogModule
  ],
  declarations: [
    AddressEditorComponent
  ],
  exports: [
    AddressEditorComponent
  ]
})
export class FadqLibAddressEditorModule {}
