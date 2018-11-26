import { Component, OnInit } from '@angular/core';

import { Register } from '@igo2/context';

import { ToolService } from '@igo2/context';

import { EntityStore } from '../../entity/shared/store';
import { Catalog } from '../../catalog/shared/catalog.interface';
import { CatalogService } from '../../catalog/shared/catalog.service';
import { CatalogStoreService } from '../../catalog/shared/catalog-store.service';

@Register({
  name: 'catalogFadq',
  title: 'igo.tools.catalog',
  icon: 'photo_library'
})
@Component({
  selector: 'fadq-catalog-library-tool',
  templateUrl: './catalog-library-tool.component.html'
})
export class CatalogLibraryToolComponent implements OnInit {

  get store(): EntityStore<Catalog> {
    return this.catalogStoreService.getCatalogStore();
  }

  constructor(
    private catalogService: CatalogService,
    private catalogStoreService: CatalogStoreService,
    private toolService: ToolService
  ) {}

  ngOnInit() {
    if (this.store.empty) {
      this.loadCatalogs();
    }
  }

  onCatalogSelectChange(event: {selected: boolean; catalog: Catalog}) {
    if (event.selected === false) {
      return;
    }
    const tool = this.toolService.getTool('catalogBrowser');
    if (tool) {
      this.toolService.selectTool(tool);
    }
  }

  private loadCatalogs() {
    this.catalogService.loadCatalogs()
      .subscribe((catalogs: Catalog[]) => this.store.addEntities(catalogs));
  }

}
