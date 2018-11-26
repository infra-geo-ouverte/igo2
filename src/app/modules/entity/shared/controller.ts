import { ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { isEquivalent } from '../../utils/object';
import { Entity, State } from './entity.interface';
import { EntityStore } from './store';

export class EntityStoreController {

  private cdRef: ChangeDetectorRef;

  private entityWatcher$$: Subscription;
  private stateWatcher$$: Subscription;
  private innerState = new Map();

  get store():  EntityStore<Entity> {
    return this._store;
  }
  private _store: EntityStore<Entity>;

  constructor(store?: EntityStore<Entity>) {
    if (store !== undefined) {
      this.bind(store);
    }
  }

  bind(store: EntityStore<Entity>): EntityStoreController {
    this.unbind();
    this.watch(store);
    this._store = store;
    this.detectChanges();

    return this;
  }

  unbind(): EntityStoreController {
    this.unwatch();

    this.innerState = new Map();
    this._store = undefined;

    return this;
  }

  withChangeDetector(cdRef: ChangeDetectorRef): EntityStoreController {
    this.cdRef = cdRef;
    return this;
  }

  updateEntityState(entity: Entity, changes: { [key: string]: boolean }, exclusive = false) {
    if (this.store === undefined) {
      return;
    }
    this.store.updateEntityState(entity, changes, exclusive);
  }

  updateEntitiesState(entities: Entity[], changes: { [key: string]: boolean }) {
    if (this.store === undefined) {
      return;
    }
    this.store.updateEntitiesState(entities, changes);
  }

  private watch(store: EntityStore<Entity>) {
    this.unwatch();

    this.entityWatcher$$ = store.rawObservable
      .subscribe((entities: Entity[]) => this.onEntitiesChanged(entities));

    this.stateWatcher$$ = store.state.observable
      .pipe(skip(1))
      .subscribe((state: Map<string, State>) => this.onStateChanged(state));
  }

  private unwatch() {
    if (this.store === undefined) {
      return;
    }
    this.entityWatcher$$.unsubscribe();
    this.stateWatcher$$.unsubscribe();
  }

  private onEntitiesChanged(entities: Entity[]) {
    this.detectChanges();
  }

  private onStateChanged(state: Map<string, State>) {
    let detectChanges = false;
    Array.from(state.keys()).forEach((id: string) => {
      const storeState = state.get(id);
      const innerState = this.innerState.get(id);
      if (innerState === undefined) {
        detectChanges = true;
      } else if (this.cdRef !== undefined && detectChanges === false) {
        detectChanges = !isEquivalent(storeState, innerState);
      }
      this.innerState.set(id, Object.assign({}, storeState));
    });

    if (detectChanges !== false) {
      this.detectChanges();
    }
  }

  private detectChanges() {
    if (this.cdRef !== undefined) {
      this.cdRef.detectChanges();
    }
  }

}
