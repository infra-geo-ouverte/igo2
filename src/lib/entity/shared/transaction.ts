import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { uuid } from '@igo2/utils';

import {
  Entity,
  EntityOperation,
  EntityOperationState
} from './entity.interfaces';
import { EntityStore } from './store';
import { EntityOperationType } from './entity.enums';
import { getEntityId } from './entity.utils';

export class EntityTransaction {

  private inCommitPhase = false;

  get operations():  EntityStore<EntityOperation, EntityOperationState> {
    return this._operations;
  }
  private _operations: EntityStore<EntityOperation, EntityOperationState>;

  get empty(): boolean {
    return this.operations.empty;
  }

  constructor() {
    this._operations = new EntityStore<EntityOperation, EntityOperationState>();
  }

  insert(current: Entity, store?: EntityStore<Entity>) {
    this.addOperation({
      id: this.generateOperationId(),
      entityId: getEntityId(current),
      type: EntityOperationType.Insert,
      previous: undefined,
      current,
      store
    });

    if (store !== undefined) {
      store.addEntities([current]);
    }
  }

  update(previous: Entity, current: Entity, store?: EntityStore<Entity>) {
    this.addOperation({
      id: this.generateOperationId(),
      entityId: getEntityId(current),
      type: EntityOperationType.Update,
      previous,
      current,
      store
    });

    if (store !== undefined) {
      store.putEntities([current]);
    }
  }

  delete(previous: Entity, store?: EntityStore<Entity>) {
    this.addOperation({
      id: this.generateOperationId(),
      entityId: getEntityId(previous),
      type: EntityOperationType.Delete,
      previous,
      current: undefined,
      store
    });

    if (store !== undefined) {
      store.removeEntities([previous]);
    }
  }

  commit(
    commitHandler: (transaction: EntityTransaction, operations: EntityOperation[]) => Observable<any>
  ): Observable<any> {
    this.inCommitPhase = true;

    const operations = this.getOperationsInCommit();
    return commitHandler(this, operations)
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
    this.inCommitPhase = false;
  }

  clear() {
    // TODO: Raise event and synchronize stores?
    this.operations.setEntities([]);
    this.inCommitPhase = false;
  }

  private resolveOperations(operations: EntityOperation[]) {
    // TODO: Raise event and synchronize stores?
    this.operations.removeEntities(operations);
  }

  private onCommitSuccess(operations: EntityOperation[]) {
    this.resolveOperations(operations);
    this.inCommitPhase = false;
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

    this.removeOperationsByEntityId(operation.entityId);
    this.operations.addEntities([operation]);
    this.operations.updateEntityState(operation, {added: true});
  }

  private removeOperationsByEntityId(entityId: string) {
    const operations = this.operations.entities
      .filter((operation: EntityOperation) => operation.entityId === entityId);
    if (operations.length > 0) {
      this.operations.removeEntities(operations);
    }
  }

  private getOperationsInCommit(): EntityOperation[] {
    return this.operations.entities
      .filter((operation: EntityOperation) => {
        const state = this.operations.getEntityState(operation);
        return state.added === true;
      });
  }
}
