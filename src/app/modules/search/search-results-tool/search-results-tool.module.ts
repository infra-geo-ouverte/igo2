import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { FadqLibSearchResultsModule } from 'src/lib/search/search-results/search-results.module';

import { SearchResultsToolComponent } from './search-results-tool.component';

@NgModule({
  imports: [FadqLibSearchResultsModule],
  declarations: [SearchResultsToolComponent],
  exports: [SearchResultsToolComponent],
  entryComponents: [SearchResultsToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqSearchResultsToolModule {}
