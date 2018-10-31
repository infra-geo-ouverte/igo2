import { Component, OnInit } from '@angular/core';

import { Register } from '@igo2/context';

import { MapService } from '@igo2/geo';

import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/datastore';
import { Catalog } from '../../catalog/shared/catalog.interface';
import { CatalogService } from '../../catalog/shared/catalog.service';
import { CatalogStoreService } from '../../catalog/shared/catalog-store.service';

@Register({
  name: 'catalogFadq',
  title: 'igo.tools.catalog',
  icon: 'photo_library'
})
@Component({
  selector: 'fadq-catalog-tool',
  templateUrl: './catalog-tool.component.html'
})
export class CatalogToolComponent implements OnInit{

  get store(): DataStore<Record<Catalog>> {
    return this.catalogStoreService.getStore();
  }

  constructor(
    private mapService: MapService,
    private catalogService: CatalogService,
    private catalogStoreService: CatalogStoreService
  ) {}

  ngOnInit() {
    this.store.clear();
    this.store.setRecords([
      {
        rid: 'swwf',
        meta: {
          id: 'swwf',
          title: 'Toutes les données'
        },
        data: {
          url: '/swwf'
        }
      }
    ]);
  }

  selectCatalog(catalog: Record<Catalog>) {
    console.log(catalog);
  }
}

