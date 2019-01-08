import {
  EntityOperation,
  EntityOperationType,
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

export function generateOperationTitle(element: AnyClientSchemaElement): string {
  // TODO: this is for demo purpose. Make it clean.
  let geometryType;
  if (element.geometry.type === 'Point') {
    geometryType = 'Point';
  } else if (element.geometry.type === 'LineString') {
    geometryType = 'Ligne';
  } else if (element.geometry.type === 'Polygon') {
    geometryType = 'Surface';
  }

  const terms = [
    geometryType,
    element.properties.typeElement,
    element.properties.description || undefined
  ];
  return terms.filter((term: string) => term !== undefined).join(' - ');
}
