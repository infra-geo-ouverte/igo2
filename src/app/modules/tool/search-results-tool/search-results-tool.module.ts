import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { IgoFeatureModule } from '@igo2/geo';
import { SearchResultsToolComponent } from './search-results-tool.component';

@NgModule({
  imports: [IgoFeatureModule],
  declarations: [SearchResultsToolComponent],
  exports: [SearchResultsToolComponent],
  entryComponents: [SearchResultsToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqSearchResultsToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqSearchResultsToolModule,
      providers: []
    };
  }
}
