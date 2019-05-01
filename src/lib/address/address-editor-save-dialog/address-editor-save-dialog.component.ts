import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'fadq-address-editor-save-dialog',
  templateUrl: 'address-editor-save-dialog.component.html',
  styleUrls: ['./address-editor-save-dialog.component.scss']
})
export class AddressEditorSaveDialogComponent {

  /**
   * Event emmit on a saved address
   */
  @Output() addressSave = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<AddressEditorSaveDialogComponent>
  ) {}

  onYesClick() {
    this.addressSave.emit(true);
    this.dialogRef.close();
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
