import {
  EntityOperation,
  EntityOperationType
} from 'src/lib/entity';

import {
  AnyClientSchemaElement,
  ClientSchemaElementTransactionData
} from './client-schema-element.interfaces';

export class ClientSchemaElementTransactionSerializer {

  serializeOperations(operations: EntityOperation[]): ClientSchemaElementTransactionData {
    const inserts = [];
    const updates = [];
    const deletes = [];

    operations.forEach((operation: EntityOperation) => {
      if (operation.type === EntityOperationType.Insert) {
        inserts.push(this.serializeInsert(operation));
      } else if (operation.type === EntityOperationType.Update) {
        updates.push(this.serializeUpdate(operation));
      } else if (operation.type === EntityOperationType.Delete) {
        deletes.push(this.serializeDelete(operation));
      }
    });

    return {inserts, updates, deletes};
  }

  private serializeInsert(operation: EntityOperation): AnyClientSchemaElement {
    return operation.current as AnyClientSchemaElement;
  }

  private serializeUpdate(operation: EntityOperation): AnyClientSchemaElement {
    return operation.current as AnyClientSchemaElement;
  }

  private serializeDelete(operation: EntityOperation): string {
    return operation.entityId;
  }

}
