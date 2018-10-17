import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { MatDividerModule } from '@angular/material';

import { FadqPlaceSelectorModule } from '../../navigation/place-selector/place-selector.module';
import { FadqPoiSelectorModule } from '../../navigation/poi-selector/poi-selector.module';
import { NavigationToolComponent } from './navigation-tool.component';

@NgModule({
  imports: [
    MatDividerModule,
    FadqPlaceSelectorModule,
    FadqPoiSelectorModule
  ],
  declarations: [NavigationToolComponent],
  exports: [NavigationToolComponent],
  entryComponents: [NavigationToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqNavigationToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqNavigationToolModule,
      providers: []
    };
  }
}
