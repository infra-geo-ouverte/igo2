import { NgModule, ModuleWithProviders } from '@angular/core';

import { FadqEditAddressesToolModule } from './edit-addresses-tool/edit-addresses-tool.module';
import { FadqSearchResultsToolModule } from './search-results-tool/search-results-tool.module';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    FadqEditAddressesToolModule,
    FadqSearchResultsToolModule
  ]
})
export class FadqToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqToolModule,
      providers: []
    };
  }
}
