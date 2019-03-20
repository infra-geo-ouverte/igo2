import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { EntityTransaction, WidgetComponent } from '@igo2/common';

@Component({
  selector: 'fadq-client-schema-element-undo',
  templateUrl: './client-schema-element-undo.component.html',
  styleUrls: ['./client-schema-element-undo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaElementUndoComponent implements WidgetComponent {

  @Input()
  set transaction(value: EntityTransaction) {
    if (this.transaction !== undefined) { return; }
    this._transaction = value;
  }
  get transaction(): EntityTransaction { return this._transaction; }
  private _transaction;

  /**
   * Event emitted on complete
   */
  @Output() complete = new EventEmitter<void>();

  /**
   * Event emitted on cancel
   */
  @Output() cancel = new EventEmitter<void>();

  constructor() {}

  onSubmit() {
    this.transaction.rollback();
    this.complete.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

}
