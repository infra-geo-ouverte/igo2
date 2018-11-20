import { Injectable } from '@angular/core';

import { getEntityId } from '../../entity/shared/entity.utils';
import { EntityStore } from '../../entity/shared/store';
import { Catalog, CatalogItem } from './catalog.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogStoreService {

  private catalogStore: EntityStore<Catalog>;
  private catalogItemsStores = new Map<string, EntityStore<CatalogItem>>();

  constructor() {
    this.catalogStore = new EntityStore();
  }

  getCatalogStore(): EntityStore<Catalog> {
    return this.catalogStore;
  }

  getCatalogItemsStore(catalog: Catalog): EntityStore<CatalogItem> {
    return this.catalogItemsStores.get(getEntityId(catalog));
  }

  setCatalogItemsStore(catalog: Catalog, store: EntityStore<CatalogItem>) {
    this.catalogItemsStores.set(getEntityId(catalog), store);
  }
}
