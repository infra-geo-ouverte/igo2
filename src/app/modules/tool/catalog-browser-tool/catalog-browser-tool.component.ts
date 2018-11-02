import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Register } from '@igo2/context';

import { IgoMap, MapService } from '@igo2/geo';

import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/datastore';
import { Catalog, CatalogItem } from '../../catalog/shared/catalog.interface';
import { CatalogService } from '../../catalog/shared/catalog.service';
import { CatalogStoreService } from '../../catalog/shared/catalog-store.service';
import { catalogItemToRecord } from '../../catalog/shared/catalog.utils';

@Register({
  name: 'catalogBrowser',
  title: 'igo.tools.catalog',
  icon: 'photo_browser'
})
@Component({
  selector: 'fadq-catalog-browser-tool',
  templateUrl: './catalog-browser-tool.component.html'
})
export class CatalogBrowserToolComponent implements OnInit {

  public store: DataStore<Record<CatalogItem>> = new DataStore();

  private catalog$$: Subscription;

  get map(): IgoMap {
    return this.mapService.getMap();
  }

  constructor(
    private mapService: MapService,
    private catalogService: CatalogService,
    private catalogStoreService: CatalogStoreService
  ) {}

  ngOnInit() {
    const catalogStore = this.catalogStoreService.getStore();
    this.catalog$$ = catalogStore.selected$
      .subscribe((catalogs: Record<Catalog>[]) => {
        if (catalogs.length > 0) {
          this.loadCatalogItems(catalogs[0].data);
        }
      })
  }

  ngOnDestroy() {
    this.catalog$$.unsubscribe();
  }

  selectCatalogItem(catalogItem: Record<CatalogItem>) {
    console.log(catalogItem);
  }

  private loadCatalogItems(catalog: Catalog) {
    if (catalog.items !== undefined) {
      this.store.setRecords(catalog.items.map(catalogItemToRecord));
    } else {
      this.catalogService.loadCatalogItems(catalog)
        .subscribe((items: CatalogItem[]) => {
          catalog.items = items;
          this.store.setRecords(catalog.items.map(catalogItemToRecord));
        });
    }
  }

}
