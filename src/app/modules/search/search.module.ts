import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideIChercheSearchSource,
  provideNominatimSearchSource,
  provideDataSourceSearchSource
} from '@igo2/geo';

import { FadqSearchBarModule } from './search-bar/search-bar.module';
import { FadqSearchSelectorModule } from './search-selector/search-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FadqSearchBarModule,
    FadqSearchSelectorModule
  ],
  exports: [
    FadqSearchBarModule,
    FadqSearchSelectorModule
  ],
  declarations: [],
  providers: [
    provideNominatimSearchSource(),
    provideIChercheSearchSource(),
    provideDataSourceSearchSource()
  ]
})
export class FadqSearchModule {}
