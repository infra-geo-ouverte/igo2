import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  EntityOperation,
  EntityOperationType,
  EntityTransaction,
  EntityTableTemplate,
  EntityTableColumnRenderer,
  getEntityId,
  getEntityTitle,
  WidgetComponent
} from '@igo2/common';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaElementService } from '../shared/client-schema-element.service';
import { ClientSchemaElementTransactionSerializer } from '../shared/client-schema-element.utils';

@Component({
  selector: 'fadq-client-schema-element-saver',
  templateUrl: './client-schema-element-saver.component.html',
  styleUrls: ['./client-schema-element-saver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaElementSaverComponent implements WidgetComponent {

  static operationIcons = {
    [EntityOperationType.Insert]: 'add',
    [EntityOperationType.Update]: 'edit',
    [EntityOperationType.Delete]: 'delete'
  };

  public tableTemplate: EntityTableTemplate = {
    selection: false,
    sort: false,
    columns: [
      {
        name: 'type',
        title: 'Opération',
        renderer: EntityTableColumnRenderer.Icon,
        valueAccessor: (operation: EntityOperation) => {
          return ClientSchemaElementSaverComponent.operationIcons[operation.type];
        }
      },
      {
        name: 'title',
        title: 'Élément',
        valueAccessor: (operation: EntityOperation) => {
          return getEntityTitle(operation) || getEntityId(operation);
        }
      }
    ]
  };

  @Input()
  set schema(value: ClientSchema) {
    if (this.schema !== undefined) { return; }
    this._schema = value;
  }
  get schema(): ClientSchema { return this._schema; }
  private _schema: ClientSchema;

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

  constructor(
    private clientSchemaElementService: ClientSchemaElementService
  ) {}

  onOperationClick(operation: EntityOperation) {
    const store = operation.store;
    const entity = operation.current;
    if (store !== undefined && entity !== undefined) {
      store.state.update(entity, {selected: true}, true);
    }
  }

  onSubmit() {
    this.clientSchemaElementService
      .commitTransaction(this.schema, this.transaction)
      .subscribe(() => this.onSubmitSuccess());
  }

  onCancel() {
    this.cancel.emit();
  }

  private onSubmitSuccess() {
    this.complete.emit();
  }

}
