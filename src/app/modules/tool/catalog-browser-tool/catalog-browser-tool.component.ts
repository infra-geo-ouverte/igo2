import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Register } from '@igo2/context';

import { IgoMap} from '../../map/shared/map';
import { MapService} from '../../map/shared/map.service';
import { EntityStore } from '../../entity/shared/store';
import { State } from '../../entity/shared/entity.interface';
import { Catalog, CatalogItem } from '../../catalog/shared/catalog.interface';
import { CatalogService } from '../../catalog/shared/catalog.service';
import { CatalogStoreService } from '../../catalog/shared/catalog-store.service';

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

  public store: EntityStore<CatalogItem>;

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
      .observeFirstBy((catalog: Catalog, state: State) => state.selected === true)
      .subscribe((catalog: Catalog) => this.loadCatalogItems(catalog));
  }

  ngOnDestroy() {
    this.catalog$$.unsubscribe();
  }

  private loadCatalogItems(catalog: Catalog) {
    const store = this.catalogStoreService.getCatalogItemsStore(catalog);
    if (store !== undefined) {
      this.store = store;
      return;
    }

    this.store = new EntityStore<CatalogItem>();
    this.catalogStoreService.setCatalogItemsStore(catalog, this.store);
    this.catalogService.loadCatalogItems(catalog)
      .subscribe((items: CatalogItem[]) => this.store.setEntities(items, true));
  }

}
