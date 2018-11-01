import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Register } from '@igo2/context';

import { MapService } from '@igo2/geo';

import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/datastore';
import { Catalog, CatalogItem } from '../../catalog/shared/catalog.interface';
import { CatalogService } from '../../catalog/shared/catalog.service';
import { CatalogStoreService } from '../../catalog/shared/catalog-store.service';
import { catalogItemToRecord } from '../../catalog/shared/catalog.utils';
import { setCatalogItems } from '../../catalog/shared/catalog.utils';

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
          this.loadCatalogItems(catalogs[0]);
        }
      })
  }

  ngOnDestroy() {
    this.catalog$$.unsubscribe();
  }

  selectCatalogItem(catalogItem: Record<CatalogItem>) {
    console.log(catalogItem);
  }

  private loadCatalogItems(catalog: Record<Catalog>) {
    this.catalogService.loadCatalogItems(catalog.data)
      .subscribe((items: CatalogItem[]) => {
        setCatalogItems(catalog.data, items);
        const records = catalog.data.items.map((item: CatalogItem) =>
          catalogItemToRecord(item)
        );
        this.store.setRecords(records);
      });
  }

}

