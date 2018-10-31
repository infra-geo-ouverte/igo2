import { Injectable } from '@angular/core';

import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/datastore';
import { Catalog } from './catalog.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogStoreService {

  private store: DataStore<Record<Catalog>>;

  constructor() {
    this.store = new DataStore();
  }

  getStore(): DataStore<Record<Catalog>> {
    return this.store;
  }
}
