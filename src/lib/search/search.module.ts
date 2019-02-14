import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideSearchSourceService } from './shared/search-source.service';
import {
  provideIChercheSearchSource,
  provideIChercheReverseSearchSource,
  provideDefaultIChercheSearchResultFormatter
} from './shared/sources/icherche.providers';
import { provideNominatimSearchSource } from './shared/sources/nominatim.providers';
import { provideILayerSearchSource } from './shared/sources/ilayer.providers';

import { FadqLibSearchBarModule } from './search-bar/search-bar.module';
import { FadqLibSearchSelectorModule } from './search-selector/search-selector.module';
import { FadqLibSearchResultsModule } from './search-results/search-results.module';

@NgModule({
  imports: [
    CommonModule,
    FadqLibSearchBarModule,
    FadqLibSearchSelectorModule,
    FadqLibSearchResultsModule
  ],
  exports: [
    FadqLibSearchBarModule,
    FadqLibSearchSelectorModule,
    FadqLibSearchResultsModule
  ],
  declarations: []
})
export class FadqLibSearchModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibSearchModule,
      providers:  [
        provideSearchSourceService(),
        provideDefaultIChercheSearchResultFormatter(),
        provideIChercheSearchSource(),
        provideIChercheReverseSearchSource(),
        provideNominatimSearchSource(),
        // provideILayerSearchSource()
      ]
    };
  }
}
