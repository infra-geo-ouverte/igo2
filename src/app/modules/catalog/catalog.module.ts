import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatListModule,
  MatTooltipModule
} from '@angular/material';

import { IgoListModule, IgoCollapsibleModule } from '@igo2/common';

import { CatalogService } from './shared/catalog.service';
import { CatalogStoreService } from './shared/catalog-store.service';
import { FadqCatalogBrowserModule } from './catalog-browser/catalog-browser.module';
import { FadqCatalogLibraryModule } from './catalog-library/catalog-library.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    IgoListModule,
    IgoCollapsibleModule
  ],
  exports: [
    FadqCatalogBrowserModule,
    FadqCatalogLibraryModule
  ],
  declarations: []
})
export class FadqCatalogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqCatalogModule,
      providers: [
        CatalogService,
        CatalogStoreService
      ]
    };
  }
}
