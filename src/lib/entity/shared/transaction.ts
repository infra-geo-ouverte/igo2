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

export class EntityTransaction {

  get operations():  EntityStore<EntityOperation, EntityOperationState> {
    return this._operations;
  }
  private _operations: EntityStore<EntityOperation, EntityOperationState>;

  get empty(): boolean {
    return this.operations.empty;
  }

  get inCommitPhase(): boolean {
    return this._inCommitPhase;
  }
  private _inCommitPhase = false;

  constructor() {
    this._operations = new EntityStore<EntityOperation, EntityOperationState>();
  }

  insert(current: Entity, store?: EntityStore<Entity>, meta?: EntityMeta) {
    const existingOperation = this.getOperationByEntity(current);
    if (existingOperation !== undefined) {
      this.removeOperation(existingOperation);
    }

    this.doInsert(current, store, meta);
  }

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

  abort() {
    // TODO: Raise event and synchronize stores?
    this._inCommitPhase = false;
  }

  clear() {
    // TODO: Raise event and synchronize stores?
    this.operations.setEntities([]);
    this._inCommitPhase = false;
  }

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

  private resolveOperations(operations: EntityOperation[]) {
    // TODO: Raise event and synchronize stores?
    this.operations.removeEntities(operations);
  }

  private onCommitSuccess(operations: EntityOperation[]) {
    this.resolveOperations(operations);
    this._inCommitPhase = false;
  }

  private onCommitError(operations: EntityOperation[]) {
    this.abort();
  }

  private generateOperationId(): string {
    return uuid();
  }

  private addOperation(operation: EntityOperation) {
    if (this.inCommitPhase === true) {
      throw new Error('This transaction is in the commit phase. Abort or clear the transaction to proceed.');
    }

    this.operations.appendEntities([operation]);
    this.operations.updateEntityState(operation, {added: true});
  }

  private removeOperation(operation: EntityOperation) {
    if (this.inCommitPhase === true) {
      throw new Error('This transaction is in the commit phase. Abort or clear the transaction to proceed.');
    }

    this.operations.removeEntities([operation]);
    this.operations.updateEntityState(operation, {added: false});
  }

  private getOperationByEntity(entity: Entity): EntityOperation {
    const entityId = getEntityId(entity);
    return this.operations.entities.find((operation: EntityOperation) => {
      return operation.entityId === entityId;
    });
  }

  private getOperationsInCommit(): EntityOperation[] {
    return this.operations.entities
      .filter((operation: EntityOperation) => {
        const state = this.operations.getEntityState(operation);
        return state.added === true;
      });
  }
}
