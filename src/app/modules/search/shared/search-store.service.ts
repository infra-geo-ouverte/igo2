import { Injectable } from '@angular/core';

import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';

@Injectable({
  providedIn: 'root'
})
export class SearchStoreService {

  private store: EntityStore<Entity>;

  constructor() {
    this.store = new EntityStore<Entity>();
  }

  getStore(): EntityStore<Entity> {
    return this.store;
  }
}
