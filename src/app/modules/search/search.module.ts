import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchStoreService } from './shared/search-store.service';
import { provideSearchSourceService } from './shared/search-source.service';
import { provideIChercheSearchSource } from './shared/sources/icherche.provider';
import { provideNominatimSearchSource } from './shared/sources/nominatim.provider';
import { provideILayerSearchSource } from './shared/sources/ilayer.provider';

import { FadqSearchBarModule } from './search-bar/search-bar.module';
import { FadqSearchSelectorModule } from './search-selector/search-selector.module';
import { FadqSearchStoreModule } from './search-store/search-store.module';

@NgModule({
  imports: [
    CommonModule,
    FadqSearchBarModule,
    FadqSearchSelectorModule,
    FadqSearchStoreModule
  ],
  exports: [
    FadqSearchBarModule,
    FadqSearchSelectorModule,
    FadqSearchStoreModule
  ],
  declarations: []
})
export class FadqSearchModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqSearchModule,
      providers:  [
        SearchStoreService,
        provideSearchSourceService(),
        provideIChercheSearchSource(),
        provideNominatimSearchSource(),
        provideILayerSearchSource()
      ]
    };
  }
}
