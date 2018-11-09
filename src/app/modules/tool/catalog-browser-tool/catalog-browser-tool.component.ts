import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Register } from '@igo2/context';

import { IgoMap, MapService } from '@igo2/geo';

import { Record, RecordState } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/store';
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
export class CatalogBrowserToolComponent implements OnInit, OnDestroy {

  public store: DataStore<Record<CatalogItem>>;
  public storeIsReady = false;

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
    const catalogStore = this.catalogStoreService.getCatalogStore();

    this.catalog$$ = catalogStore
      .observeBy((catalog: Record<Catalog>, state: RecordState) => {
        return state.selected === true;
      })
      .subscribe((catalogs: Record<Catalog>[]) => {
        if (catalogs.length > 0) {
          this.loadCatalogItems(catalogs[0]);
        }
      });
  }

  ngOnDestroy() {
    this.catalog$$.unsubscribe();
  }

  private loadCatalogItems(catalog: Record<Catalog>) {
    const store = this.catalogStoreService.getCatalogItemsStore(catalog);
    if (store !== undefined) {
      this.store = store;
      this.storeIsReady = true;
      return;
    }

    this.store = new DataStore<Record<CatalogItem>>();
    this.catalogStoreService.setCatalogItemsStore(catalog, this.store);
    this.storeIsReady = true;

    this.catalogService.loadCatalogItems(catalog.data)
      .subscribe((items: CatalogItem[]) => {
        this.store.setRecords(items.map(catalogItemToRecord), true);
      });

  }

}
