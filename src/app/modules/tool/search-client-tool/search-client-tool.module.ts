import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { IgoFeatureModule } from '@igo2/geo';
import { SearchClientToolComponent } from './search-client-tool.component';

@NgModule({
  imports: [IgoFeatureModule],
  declarations: [SearchClientToolComponent],
  exports: [SearchClientToolComponent],
  entryComponents: [SearchClientToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqSearchClientToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqSearchClientToolModule,
      providers: []
    };
  }
}
