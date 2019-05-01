import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'fadq-address-editor-zoom-dialog',
  templateUrl: 'address-editor-zoom-dialog.component.html',
  styleUrls: ['./address-editor-zoom-dialog.component.scss']
})
export class AddressEditorZoomDialogComponent {

  /**
   * Event emmit on a saved address
   */
  @Output() addressZoom = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<AddressEditorZoomDialogComponent>
  ) {}

  onYesClick() {
    this.addressZoom.emit(true);
    this.dialogRef.close();
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
