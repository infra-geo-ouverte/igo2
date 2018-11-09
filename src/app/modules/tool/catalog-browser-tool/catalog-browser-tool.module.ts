import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FadqCatalogModule } from '../../catalog/catalog.module';
import { CatalogBrowserToolComponent } from './catalog-browser-tool.component';

@NgModule({
  imports: [
    CommonModule,
    FadqCatalogModule
  ],
  declarations: [CatalogBrowserToolComponent],
  exports: [CatalogBrowserToolComponent],
  entryComponents: [CatalogBrowserToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqCatalogBrowserToolModule {}
