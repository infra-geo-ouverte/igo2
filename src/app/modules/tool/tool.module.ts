import { NgModule, ModuleWithProviders } from '@angular/core';

import { FadqFeatureDetailsToolModule } from './feature-details-tool/feature-details-tool.module';
import { FadqSearchClientToolModule } from './search-client-tool/search-client-tool.module';
import { FadqEditAddressesToolModule } from './edit-addresses-tool/edit-addresses-tool.module';
import { FadqSearchResultsToolModule } from './search-results-tool/search-results-tool.module';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    FadqFeatureDetailsToolModule,
    FadqSearchClientToolModule,
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
