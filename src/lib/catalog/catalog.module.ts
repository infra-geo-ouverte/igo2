import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatListModule,
  MatTooltipModule
} from '@angular/material';

import { IgoListModule, IgoCollapsibleModule } from '@igo2/common';

import { CatalogService } from './shared';
import { FadqLibCatalogBrowserModule } from './catalog-browser/catalog-browser.module';
import { FadqLibCatalogLibraryModule } from './catalog-library/catalog-library.module';

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
    FadqLibCatalogBrowserModule,
    FadqLibCatalogLibraryModule
  ],
  declarations: []
})
export class FadqLibCatalogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibCatalogModule,
      providers: [
        CatalogService
      ]
    };
  }
}
