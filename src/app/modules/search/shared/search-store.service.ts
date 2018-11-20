import { Injectable } from '@angular/core';

import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';

@Injectable({
  providedIn: 'root'
})
export class SearchStoreService {

  get store(): EntityStore<Entity> {
    return this._store;
  }
  private _store: EntityStore<Entity>;

  constructor() {
    this._store = new EntityStore<Entity>();
  }

}
