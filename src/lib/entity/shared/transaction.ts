import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
  EntityKey,
  EntityTransactionOptions,
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
  readonly operations: EntityStore<EntityOperation, EntityOperationState>;

  /**
   * Method to get an entity's id
   */
  readonly getKey: (E) => EntityKey;

  /**
   * Whether there are pending operations
   */
  get empty(): boolean { return this.operations.entities$.value.length === 0; }

  /**
   * Whether thise store is in commit phase
   */
  get inCommitPhase(): boolean { return this._inCommitPhase; }
  private _inCommitPhase: boolean = false;

  constructor(options: EntityTransactionOptions = {}) {
    this.getKey = options.getKey ? options.getKey : getEntityId;
    this.operations = new EntityStore<EntityOperation, EntityOperationState>([], {
      getKey: this.getKey
    });
  }

  destroy() {
    this.operations.destroy();
  }

  /**
   * Insert an entity into a store. If no store is specified, an insert
   * operation is still created but the transaction won't add the new
   * entity to the store.
   * @param current The entity to insert
   * @param store Optional: The store to insert the entity into
   * @param meta Optional: Any metadata on the operation
   */
  insert(current: object, store?: EntityStore<object>, meta?: {[key: string]: any}) {
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
  update(previous: object, current: object, store?: EntityStore<object>, meta?: {[key: string]: any}) {
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
  delete(previous: object, store?: EntityStore<object>, meta?: {[key: string]: any}) {
    const existingOperation = this.getOperationByEntity(previous);
    if (existingOperation !== undefined) {
      this.removeOperation(existingOperation);
      if (existingOperation.type === EntityOperationType.Insert) {
        if (store !== undefined) {
          store.delete(previous);
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
    this._inCommitPhase = true;

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
    this._inCommitPhase = false;
  }

  /**
   * Clear this transaction
   * @todo Raise event and synchronize stores?
   */
  clear() {
    this.operations.clear();
    this._inCommitPhase = false;
  }

  /**
   * Create an insert operation and add an entity to the store
   * @param current The entity to insert
   * @param store Optional: The store to insert the entity into
   * @param meta Optional: Any metadata on the operation
   */
  private doInsert(current: object, store?: EntityStore<object>, meta?: {[key: string]: any}) {
    this.addOperation({
      key: this.getKey(current),
      type: EntityOperationType.Insert,
      previous: undefined,
      current,
      store,
      meta
    });

    if (store !== undefined) {
      store.update(current);
    }
  }

  /**
   * Create an update operation and update an entity into the store
   * @param previous The entity before update
   * @param current The entity after update
   * @param store Optional: The store to update the entity into
   * @param meta Optional: Any metadata on the operation
   */
  private doUpdate(previous: object, current: object, store?: EntityStore<object>, meta?: {[key: string]: any}) {
    this.addOperation({
      key: this.getKey(current),
      type: EntityOperationType.Update,
      previous,
      current,
      store,
      meta
    });

    if (store !== undefined) {
      store.update(current);
    }
  }

  /**
   * Create a delete operation and delete an entity from the store
   * @param previous The entity before delete
   * @param store Optional: The store to delete the entity from
   * @param meta Optional: Any metadata on the operation
   */
  private doDelete(previous: object, store?: EntityStore<object>, meta?: {[key: string]: any}) {
    this.addOperation({
      key: this.getKey(previous),
      type: EntityOperationType.Delete,
      previous,
      current: undefined,
      store,
      meta
    });

    if (store !== undefined) {
      store.delete(previous);
    }
  }

  /**
   * Remove committed operations from store
   * @param operations Commited operations
   * @todo Raise event and synchronize stores?
   */
  private resolveOperations(operations: EntityOperation[]) {
    this.operations.deleteMany(operations);
  }

  /**
   * On commit success, resolve commited operations and exit commit phase
   * @param operations Commited operations
   */
  private onCommitSuccess(operations: EntityOperation[]) {
    this.resolveOperations(operations);
    this._inCommitPhase = false;
  }

  /**
   * On commit error, abort transaction
   * @param operations Commited operations
   */
  private onCommitError(operations: EntityOperation[]) {
    this.abort();
  }

  /**
   * Add an operation to the operations store
   * @param operation Operation to add
   */
  private addOperation(operation: EntityOperation) {
    if (this.inCommitPhase === true) {
      throw new Error('This transaction is in the commit phase. Abort or clear the transaction to proceed.');
    }

    this.operations.insert(operation);
    this.operations.state.update(operation, {added: true});
  }

  /**
   * Remove an operation from the operations store
   * @param operation Operation to remove
   */
  private removeOperation(operation: EntityOperation) {
    if (this.inCommitPhase === true) {
      throw new Error('This transaction is in the commit phase. Abort or clear the transaction to proceed.');
    }

    this.operations.delete(operation);
    this.operations.state.update(operation, {added: false});
  }

  /**
   * Get the any existing operation an entity
   * @param entity Entity
   * @returns Either an insert, update or delete operation
   */
  private getOperationByEntity(entity: object): EntityOperation {
    return this.operations.get(this.getKey(entity));
  }

  /**
   * Get all the operations to commit
   * @returns Operations to commit
   */
  private getOperationsInCommit(): EntityOperation[] {
    return this.operations.stateView
      .manyBy((value: {entity: EntityOperation, state: EntityOperationState}) => {
        return value.state.added === true;
      })
      .map((value: {entity: EntityOperation, state: EntityOperationState}) => value.entity);
  }
}
