import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Register, ToolService } from '@igo2/context';

import { EntityStore } from 'src/lib/entity';
import { Catalog, CatalogService } from 'src/lib/catalog';

import { CatalogState } from '../catalog.state';

/**
 * Tool to browse the list of available catalogs.
 */
@Register({
  name: 'catalogFadq',
  title: 'igo.tools.catalog',
  icon: 'photo_library'
})
@Component({
  selector: 'fadq-catalog-library-tool',
  templateUrl: './catalog-library-tool.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogLibraryToolComponent implements OnInit {

  /**
   * Store that contains the catalogs
   * @internal
   */
  get store(): EntityStore<Catalog> { return this.catalogState.catalogStore; }

  constructor(
    private catalogService: CatalogService,
    private catalogState: CatalogState,
    private toolService: ToolService
  ) {}

  /**
   * @internal
   */
  ngOnInit() {
    if (this.store.entities$.value.length === 0) {
      this.loadCatalogs();
    }
  }

  /**
   * When the selected catalog changes, toggle the the CatalogBrowser tool.
   * @internal
   * @param event Select event
   */
  onCatalogSelectChange(event: {selected: boolean; catalog: Catalog}) {
    if (event.selected === false) {
      return;
    }
    const tool = this.toolService.getTool('catalogBrowser');
    if (tool) {
      this.toolService.selectTool(tool);
    }
  }

  /**
   * Get all the available catalogs from the CatalogService and
   * load them into the store.
   */
  private loadCatalogs() {
    this.catalogService.loadCatalogs()
      .subscribe((catalogs: Catalog[]) => {
        this.store.clear();
        this.store.load(catalogs);
      });
  }

}
