import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { uuid } from '@igo2/utils';

import {
  Entity,
  EntityMeta,
  EntityOperation,
  EntityOperationState
} from './entity.interfaces';
import { EntityStore } from './store';
import { EntityOperationType } from './entity.enums';
import { getEntityId } from './entity.utils';

export type EntityTransactionCommitHandler = (
  transaction: EntityTransaction,
  operations: EntityOperation[]
) => Observable<any>;

/**
 * This class holds a reference to the insert, update and delete
 * operations performed on a store. This is useful to commit
 * these operations in a single pass or to cancel them.
 */
export class EntityTransaction {

  /**
   * Store holding the operations on another store
   */
  operations: EntityStore<
    EntityOperation,
    EntityOperationState
  > = new EntityStore<EntityOperation, EntityOperationState>();

  /**
   * Whether thise store is in commit phase
   */
  private inCommitPhase: boolean = false;

  /**
   * Whether thise store is in commit phase
   */
  get isInCommitPhase(): boolean { return this.inCommitPhase; }

  /**
   * Whether there are pending operations
   */
  get empty(): boolean { return this.operations.filteredEmpty; }

  constructor() {}

  /**
   * Insert an entity into a store. If no store is specified, an insert
   * operation is still created but the transaction won't add the new
   * entity to the store.
   * @param current The entity to insert
   * @param store Optional: The store to insert the entity into
   * @param meta Optional: Any metadata on the operation
   */
  insert(current: Entity, store?: EntityStore<Entity>, meta?: EntityMeta) {
    const existingOperation = this.getOperationByEntity(current);
    if (existingOperation !== undefined) {
      this.removeOperation(existingOperation);
    }

    this.doInsert(current, store, meta);
  }

  /**
   * Update an entity in a store. If no store is specified, an update
   * operation is still created but the transaction won't update the
   * entity into the store.
   * @param previous The entity before update
   * @param current The entity after update
   * @param store Optional: The store to update the entity into
   * @param meta Optional: Any metadata on the operation
   */
  update(previous: Entity, current: Entity, store?: EntityStore<Entity>, meta?: EntityMeta) {
    const existingOperation = this.getOperationByEntity(current);
    if (existingOperation !== undefined) {
      this.removeOperation(existingOperation);
      if (existingOperation.type === EntityOperationType.Insert) {
        this.doInsert(current, store, meta);
        return;
      }
    }

    this.doUpdate(previous, current, store, meta);
  }

  /**
   * Delete an entity from a store. If no store is specified, a delete
   * operation is still created but the transaction won't remove the
   * entity from the store.
   * @param previous The entity before delete
   * @param store Optional: The store to delete the entity from
   * @param meta Optional: Any metadata on the operation
   */
  delete(previous: Entity, store?: EntityStore<Entity>, meta?: EntityMeta) {
    const existingOperation = this.getOperationByEntity(previous);
    if (existingOperation !== undefined) {
      this.removeOperation(existingOperation);
      if (existingOperation.type === EntityOperationType.Insert) {
        if (store !== undefined) {
          store.removeEntities([previous]);
        }
        return;
      }
    }

    this.doDelete(previous, store, meta);
  }

  /**
   * Commit the transaction. This method doesn't do much
   * in itself. The handler it receives does the hard work and it's
   * implementation is left to the caller. This method simply wraps
   * the handler into an error catching mechanism to update
   * the transaction afterward. The caller needs to subscribe to this
   * method's output (observable) for the commit to be performed.
   * @param handler Function that handles the commit operation
   * @returns The handler output (observable)
   */
  commit(handler: EntityTransactionCommitHandler): Observable<any> {
    this.inCommitPhase = true;

    const operations = this.getOperationsInCommit();
    return handler(this, operations)
      .pipe(
        catchError(() => of(new Error())),
        tap((result: any) => {
          if (result instanceof Error) {
            this.onCommitError(operations);
          } else {
            this.onCommitSuccess(operations);
          }
        })
      );
  }

  /**
   * Abort this transaction
   * @todo Raise event and synchronize stores?
   */
  abort() {
    this.inCommitPhase = false;
  }

  /**
   * Clear this transaction
   * @todo Raise event and synchronize stores?
   */
  clear() {
    this.operations.setEntities([]);
    this.inCommitPhase = false;
  }

  /**
   * Create an insert operation and add an entity to the store
   * @param current The entity to insert
   * @param store Optional: The store to insert the entity into
   * @param meta Optional: Any metadata on the operation
   */
  private doInsert(current: Entity, store?: EntityStore<Entity>, meta?: EntityMeta) {
    this.addOperation({
      id: this.generateOperationId(),
      entityId: getEntityId(current),
      type: EntityOperationType.Insert,
      previous: undefined,
      current,
      store,
      meta
    });

    if (store !== undefined) {
      store.putEntities([current]);
    }
  }

  /**
   * Create an update operation and update an entity into the store
   * @param previous The entity before update
   * @param current The entity after update
   * @param store Optional: The store to update the entity into
   * @param meta Optional: Any metadata on the operation
   */
  private doUpdate(previous: Entity, current: Entity, store?: EntityStore<Entity>, meta?: EntityMeta) {
    this.addOperation({
      id: this.generateOperationId(),
      entityId: getEntityId(current),
      type: EntityOperationType.Update,
      previous,
      current,
      store,
      meta
    });

    if (store !== undefined) {
      store.putEntities([current]);
    }
  }

  /**
   * Create a delete operation and delete an entity from the store
   * @param previous The entity before delete
   * @param store Optional: The store to delete the entity from
   * @param meta Optional: Any metadata on the operation
   */
  private doDelete(previous: Entity, store?: EntityStore<Entity>, meta?: EntityMeta) {
    this.addOperation({
      id: this.generateOperationId(),
      entityId: getEntityId(previous),
      type: EntityOperationType.Delete,
      previous,
      current: undefined,
      store,
      meta
    });

    if (store !== undefined) {
      store.removeEntities([previous]);
    }
  }

  /**
   * Remove committed operations from store
   * @param operations Commited operations
   * @todo Raise event and synchronize stores?
   */
  private resolveOperations(operations: EntityOperation[]) {
    this.operations.removeEntities(operations);
  }

  /**
   * On commit success, resolve commited operations and exit commit phase
   * @param operations Commited operations
   */
  private onCommitSuccess(operations: EntityOperation[]) {
    this.resolveOperations(operations);
    this.inCommitPhase = false;
  }

  /**
   * On commit error, abort transaction
   * @param operations Commited operations
   */
  private onCommitError(operations: EntityOperation[]) {
    this.abort();
  }

  /**
   * Generator of unique operation id
   * @returns Operation id
   */
  private generateOperationId(): string {
    return uuid();
  }

  /**
   * Add an operation to the operations store
   * @param operation Operation to add
   */
  private addOperation(operation: EntityOperation) {
    if (this.inCommitPhase === true) {
      throw new Error('This transaction is in the commit phase. Abort or clear the transaction to proceed.');
    }

    this.operations.appendEntities([operation]);
    this.operations.updateEntityState(operation, {added: true});
  }

  /**
   * Remove an operation from the operations store
   * @param operation Operation to remove
   */
  private removeOperation(operation: EntityOperation) {
    if (this.inCommitPhase === true) {
      throw new Error('This transaction is in the commit phase. Abort or clear the transaction to proceed.');
    }

    this.operations.removeEntities([operation]);
    this.operations.updateEntityState(operation, {added: false});
  }

  /**
   * Get the operation affecting an entity, if any.
   * @param entity Entity
   * @returns Either an insert, update or delete operation
   */
  private getOperationByEntity(entity: Entity): EntityOperation {
    const entityId = getEntityId(entity);
    return this.operations.entities.find((operation: EntityOperation) => {
      return operation.entityId === entityId;
    });
  }

  /**
   * Get all the operations to commit
   * @returns Operations to commit
   */
  private getOperationsInCommit(): EntityOperation[] {
    return this.operations.entities
      .filter((operation: EntityOperation) => {
        const state = this.operations.getEntityState(operation);
        return state.added === true;
      });
  }
}
