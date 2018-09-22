import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { IgoFeatureModule } from '@igo2/geo';
import { FeatureDetailsToolComponent } from './feature-details-tool.component';

@NgModule({
  imports: [IgoFeatureModule],
  declarations: [FeatureDetailsToolComponent],
  exports: [FeatureDetailsToolComponent],
  entryComponents: [FeatureDetailsToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqFeatureDetailsToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqFeatureDetailsToolModule,
      providers: []
    };
  }
}
