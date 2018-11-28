import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { Subscription } from 'rxjs';

import { Register } from '@igo2/context';

import { CatalogState, MapState } from 'src/app/state';
import { IgoMap} from 'src/app/modules/map';
import { EntityStore, State } from 'src/app/modules/entity';
import { Catalog, CatalogItem, CatalogService } from 'src/app/modules/catalog';

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
