import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  declarations: []
})
export class FadqSearchModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqSearchModule,
      providers: []
    };
  }
}
