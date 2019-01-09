import { Injectable } from '@angular/core';

import { EntityStore, getEntityId } from 'src/lib/entity';
import { Catalog, CatalogItem } from 'src/lib/catalog';

/**
 * Service that holds the state of the catalog module
 */
@Injectable({
  providedIn: 'root'
})
export class CatalogState {

  /**
   * Store that contains all the catalogs
   */
  get catalogStore(): EntityStore<Catalog> { return this._catalogStore; }
  private _catalogStore: EntityStore<Catalog>;

  /**
   * Catalog -> Catalog items store mapping
   */
  private catalogItemsStores = new Map<string, EntityStore<CatalogItem>>();

  constructor() {
    this._catalogStore = new EntityStore();
  }

  /**
   * Get a catalog's items store
   * @param catalog
   * @returns Store that contains the catalog items
   */
  getCatalogItemsStore(catalog: Catalog): EntityStore<CatalogItem> {
    return this.catalogItemsStores.get(getEntityId(catalog));
  }

  /**
   * Bind a catalog items store to a catalog
   * @param catalog
   * @param store
   */
  setCatalogItemsStore(catalog: Catalog, store: EntityStore<CatalogItem>) {
    this.catalogItemsStores.set(getEntityId(catalog), store);
  }
}
