import { Component, OnInit } from '@angular/core';

import { Register } from '@igo2/context';

import { ToolService } from '@igo2/context';

import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { Catalog } from '../../catalog/shared/catalog.interface';
import { CatalogService } from '../../catalog/shared/catalog.service';
import { CatalogStoreService } from '../../catalog/shared/catalog-store.service';
import { catalogToEntity } from '../../catalog/shared/catalog.utils';

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

  get store(): EntityStore<Entity<Catalog>> {
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

  selectCatalog(catalog: Entity<Catalog>) {
    const tool = this.toolService.getTool('catalogBrowser');
    if (tool) {
      this.toolService.selectTool(tool);
    }
  }

  private loadCatalogs() {
    this.catalogService.loadCatalogs()
      .subscribe((catalogs: Catalog[]) => {
        this.store.addEntities(catalogs.map(catalogToEntity));
      });
  }

}
