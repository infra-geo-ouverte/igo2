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

/**
 * Tool to browse a catalog's groups and layers and display them to a map.
 */
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

  /**
   * Store that contains the catalog items
   * @internal
   */
  public store: EntityStore<CatalogItem>;

  /**
   * Subscription to the selected catalog
   */
  private catalog$$: Subscription;

  /**
   * Map to add layers to
   * @internal
   */
  get map(): IgoMap { return this.mapState.map; }

  constructor(
    private catalogService: CatalogService,
    private catalogState: CatalogState,
    private mapState: MapState
  ) {}

  /**
   * @internal
   */
  ngOnInit() {
    const catalogStore = this.catalogState.catalogStore;

    this.catalog$$ = catalogStore
      .observeFirstBy((catalog: Catalog, state: State) => state.selected === true)
      .subscribe((catalog: Catalog) => this.loadCatalogItems(catalog));
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    this.catalog$$.unsubscribe();
  }

  /**
   * Get the selected catalog's items from the CatalogService and
   * load them into the store.
   * @param catalog Selected catalog
   */
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
