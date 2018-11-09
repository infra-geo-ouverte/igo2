import { Injectable } from '@angular/core';

import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/store';
import { Catalog, CatalogItem } from './catalog.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogStoreService {

  private catalogStore: DataStore<Record<Catalog>>;
  private catalogItemsStores = new Map<string, DataStore<Record<CatalogItem>>>();

  constructor() {
    this.catalogStore = new DataStore();
  }

  getCatalogStore(): DataStore<Record<Catalog>> {
    return this.catalogStore;
  }

  getCatalogItemsStore(catalog: Record<Catalog>): DataStore<Record<CatalogItem>> {
    return this.catalogItemsStores.get(catalog.rid);
  }

  setCatalogItemsStore(catalog: Record<Catalog>, store: DataStore<Record<CatalogItem>>) {
    this.catalogItemsStores.set(catalog.rid, store);
  }
}
