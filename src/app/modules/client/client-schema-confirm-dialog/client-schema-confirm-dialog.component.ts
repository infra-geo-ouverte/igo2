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

  get action(): () => void { return this.data.action; }

  constructor(
    private clientState: ClientState,
    private clientSchemaElementService: ClientSchemaElementService,
    public dialogRef: MatDialogRef<ClientSchemaConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {action: () => void}
  ) {}

  onYesClick() {
    const schema = this.clientState.schema;
    const transaction = this.clientState.transaction;
    this.clientSchemaElementService
      .commitTransaction(schema, transaction)
      .subscribe(() => {
        this.action();
        this.dialogRef.close();
      });
  }

  onNoClick() {
    this.clientState.transaction.clear();
    this.action();
    this.dialogRef.close();
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
