import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { FadqSearchModule } from '../../search/search.module';
import { SearchResultsToolComponent } from './search-results-tool.component';

@NgModule({
  imports: [FadqSearchModule],
  declarations: [SearchResultsToolComponent],
  exports: [SearchResultsToolComponent],
  entryComponents: [SearchResultsToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqSearchResultsToolModule {}
