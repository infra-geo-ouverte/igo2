import { ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';

import { isEquivalent } from '../../utils/object';
import { Entity, State } from './entity.interface';
import { EntityStore } from './store';

export class EntityStoreController {

  private cdRef: ChangeDetectorRef;

  private entityWatcher$$: Subscription;
  private stateWatcher$$: Subscription;
  private innerState = new Map();
  private firstDetection = false;

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

  private watch(store: EntityStore<Entity>) {
    this.unwatch();

    this.entityWatcher$$ = store.observable
      .subscribe((entities: Entity[]) => this.handleEntityChanges(entities));

    this.stateWatcher$$ = store.state.observable
      .subscribe((state: Map<string, State>) => this.handleStateChanges(state));
  }

  private unwatch() {
    if (this.store === undefined) {
      return;
    }
    this.entityWatcher$$.unsubscribe();
    this.stateWatcher$$.unsubscribe();
  }

  private handleEntityChanges(entities: Entity[]) {
    this.firstDetection = true;
    if (this.cdRef !== undefined) {
      this.cdRef.detectChanges();
    }
  }

  private handleStateChanges(state: Map<string, State>) {
    let detectChanges = false;

    const rids = Array.from(state.keys());
    rids.forEach((rid: string) => {
      const storeState = state.get(rid);
      const innerState = this.innerState.get(rid);
      if (innerState === undefined) {
        detectChanges = true;
      } else if (this.cdRef !== undefined && detectChanges === false) {
        detectChanges = !isEquivalent(storeState, innerState);
      }
      this.innerState.set(rid, storeState);
    });

    if (
      this.cdRef !== undefined &&
      detectChanges !== false &&
      this.firstDetection === false) {
      this.cdRef.detectChanges();
    }

    this.firstDetection = false;
  }

}
