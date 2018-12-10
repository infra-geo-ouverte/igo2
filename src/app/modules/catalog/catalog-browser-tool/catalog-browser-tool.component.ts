import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { Subscription } from 'rxjs';

import { Register } from '@igo2/context';

import { IgoMap} from 'src/lib/map';
import { EntityStore, State } from 'src/lib/entity';
import { Catalog, CatalogItem, CatalogService } from 'src/lib/catalog';

import { MapState } from 'src/app/modules/map/map.state';
import { CatalogState } from '../catalog.state';

@Register({
  name: 'catalogBrowser',
  title: 'igo.tools.catalog',
  icon: 'photo_browser'
})
@Component({
  selector: 'fadq-catalog-browser-tool',
  templateUrl: './catalog-browser-tool.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserToolComponent implements OnInit, OnDestroy {

  public store: EntityStore<CatalogItem>;

  private catalog$$: Subscription;

  get map(): IgoMap {
    return this.mapState.map;
  }

  constructor(
    private catalogService: CatalogService,
    private catalogState: CatalogState,
    private mapState: MapState
  ) {}

  ngOnInit() {
    const catalogStore = this.catalogState.catalogStore;

    this.catalog$$ = catalogStore
      .observeFirstBy((catalog: Catalog, state: State) => state.selected === true)
      .subscribe((catalog: Catalog) => this.loadCatalogItems(catalog));
  }

  ngOnDestroy() {
    this.catalog$$.unsubscribe();
  }

  private loadCatalogItems(catalog: Catalog) {
    const store = this.catalogState.getCatalogItemsStore(catalog);
    if (store !== undefined) {
      this.store = store;
      return;
    }

    this.store = new EntityStore<CatalogItem>();
    this.catalogState.setCatalogItemsStore(catalog, this.store);
    this.catalogService.loadCatalogItems(catalog)
      .subscribe((items: CatalogItem[]) => this.store.setEntities(items, true));
  }

}
