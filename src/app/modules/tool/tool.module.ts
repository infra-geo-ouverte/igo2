import { NgModule } from '@angular/core';

import { FadqAddressEditorToolModule } from './address-editor-tool/address-editor-tool.module';
import { FadqClientInfoToolModule } from './client-info-tool/client-info-tool.module';
import { FadqNavigationToolModule } from './navigation-tool/navigation-tool.module';
import { FadqSearchResultsToolModule } from './search-results-tool/search-results-tool.module';
import { FadqCatalogBrowserToolModule } from './catalog-browser-tool/catalog-browser-tool.module';
import { FadqCatalogLibraryToolModule } from './catalog-library-tool/catalog-library-tool.module';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    FadqAddressEditorToolModule,
    FadqClientInfoToolModule,
    FadqNavigationToolModule,
    FadqSearchResultsToolModule,
    FadqCatalogBrowserToolModule,
    FadqCatalogLibraryToolModule
  ]
})
export class FadqToolModule {}
