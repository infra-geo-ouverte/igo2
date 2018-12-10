import { NgModule, ModuleWithProviders } from '@angular/core';

import { FadqLibCatalogModule } from 'src/lib/catalog/catalog.module';
import { FadqCatalogLibraryToolModule } from './catalog-library-tool/catalog-library-tool.module';
import { FadqCatalogBrowserToolModule } from './catalog-browser-tool/catalog-browser-tool.module';

import { CatalogState } from './catalog.state';

@NgModule({
  imports: [
    FadqLibCatalogModule.forRoot(),
    FadqCatalogLibraryToolModule,
    FadqCatalogBrowserToolModule
  ],
  exports: [
    FadqLibCatalogModule
  ],
  declarations: []
})
export class FadqCatalogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqCatalogModule,
      providers: [
        CatalogState
      ]
    };
  }
}
