import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { PlaceSelectorToolComponent } from './place-selector-tool.component';

@NgModule({
  imports: [],
  declarations: [PlaceSelectorToolComponent],
  exports: [PlaceSelectorToolComponent],
  entryComponents: [PlaceSelectorToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqPlaceSelectorToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqPlaceSelectorToolModule,
      providers: []
    };
  }
}
