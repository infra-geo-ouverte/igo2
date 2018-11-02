import { Component, OnInit } from '@angular/core';

import { Register } from '@igo2/context';

import { ToolService } from '@igo2/context';

import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/datastore';
import { Catalog } from '../../catalog/shared/catalog.interface';
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

  get store(): DataStore<Record<Catalog>> {
    return this.catalogStoreService.getStore();
  }

  constructor(
    private catalogStoreService: CatalogStoreService,
    private toolService: ToolService
  ) {}

  ngOnInit() {
    if (this.store.empty) {
      this.loadCatalogs();
    }
  }

  selectCatalog(catalog: Record<Catalog>) {
    const tool = this.toolService.getTool('catalogBrowser');
    if (tool) {
      this.toolService.selectTool(tool);
    }
  }

  private loadCatalogs() {
    this.store.setRecords([
      {
        rid: 'swwf',
        meta: {
          id: 'swwf',
          titleProperty: 'title'
        },
        data: {
          title: 'Toute les données',
          url: '/swwf'
        }
      }
    ]);
  }

}

