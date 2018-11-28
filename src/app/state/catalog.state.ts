import { Injectable } from '@angular/core';

import { EntityStore, getEntityId } from 'src/app/modules/entity';
import { Catalog, CatalogItem } from 'src/app/modules/catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogState {

  get catalogStore(): EntityStore<Catalog> {
    return this._catalogStore;
  }
  private _catalogStore: EntityStore<Catalog>;

  private catalogItemsStores = new Map<string, EntityStore<CatalogItem>>();

  constructor() {
    this._catalogStore = new EntityStore();
  }

  getCatalogItemsStore(catalog: Catalog): EntityStore<CatalogItem> {
    return this.catalogItemsStores.get(getEntityId(catalog));
  }

  setCatalogItemsStore(catalog: Catalog, store: EntityStore<CatalogItem>) {
    this.catalogItemsStores.set(getEntityId(catalog), store);
  }
}
