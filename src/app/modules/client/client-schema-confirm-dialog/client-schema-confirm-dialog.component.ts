import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ClientSchemaElementService } from 'src/lib/client';

import { ClientState} from '../client.state';

@Component({
  selector: 'fadq-client-schema-confirm-dialog',
  templateUrl: 'client-schema-confirm-dialog.component.html',
  styleUrls: ['./client-schema-confirm-dialog.component.scss']
})
export class ClientSchemaConfirmDialogComponent {

  get confirm(): () => void { return this.data.confirm; }

  get abort(): () => void { return this.data.abort; }

  constructor(
    private clientState: ClientState,
    private clientSchemaElementService: ClientSchemaElementService,
    public dialogRef: MatDialogRef<ClientSchemaConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {confirm: () => void, abort: () => void}
  ) {}

  onYesClick() {
    const schema = this.clientState.schema;
    const transaction = this.clientState.transaction;
    this.clientSchemaElementService
      .commitTransaction(schema, transaction)
      .subscribe(() => {
        this.confirm();
        this.dialogRef.close();
      });
  }

  onNoClick() {
    this.clientState.transaction.clear();
    this.confirm();
    this.dialogRef.close();
  }

  onCancelClick() {
    this.dialogRef.close();
    if (this.abort !== undefined) {
      this.abort();
    }
  }

}
