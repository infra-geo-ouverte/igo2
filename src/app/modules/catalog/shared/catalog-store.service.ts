import { Injectable } from '@angular/core';

import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { Catalog, CatalogItem } from './catalog.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogStoreService {

  private catalogStore: EntityStore<Entity<Catalog>>;
  private catalogItemsStores = new Map<string, EntityStore<Entity<CatalogItem>>>();

  constructor() {
    this.catalogStore = new EntityStore();
  }

  getCatalogStore(): EntityStore<Entity<Catalog>> {
    return this.catalogStore;
  }

  getCatalogItemsStore(catalog: Entity<Catalog>): EntityStore<Entity<CatalogItem>> {
    return this.catalogItemsStores.get(catalog.rid);
  }

  setCatalogItemsStore(catalog: Entity<Catalog>, store: EntityStore<Entity<CatalogItem>>) {
    this.catalogItemsStores.set(catalog.rid, store);
  }
}
