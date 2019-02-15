import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MeasurerDialogData } from '../shared/measure.interfaces';

@Component({
  selector: 'measurer-dialog',
  templateUrl: 'measurer-dialog.component.html',
  styleUrls: ['./measurer-dialog.component.scss']
})
export class MeasurerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MeasurerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MeasurerDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
