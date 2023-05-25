import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {  StorageService } from '@igo2/core';


@Component({
  selector: 'igo-giin-distribuer-dialog',
  templateUrl: './giin-distribuer-dialog.component.html',
  styleUrls: ['./giin-distribuer-dialog.component.scss']
})
export class GiinDistribuerDialogComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  hide = true;
  get formControls() { return this.form.controls; }

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<GiinDistribuerDialogComponent>,
    private storageService: StorageService,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: { granulats: any; }
  ) { }

  ngOnInit() {

    const giinUsername = this.storageService.get('giinUsername') || '';


    this.form = this.formBuilder.group({
      email: [giinUsername, Validators.required],
      password: ['', Validators.required]
    });
  }

  distribuer() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    this.storageService.set('giinUsername', this.form.value.email);
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
