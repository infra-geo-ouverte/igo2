import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqPlaceSelectorModule } from './place-selector/place-selector.module';
import { FadqPoiSelectorModule } from './poi-selector/poi-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FadqPlaceSelectorModule,
    FadqPoiSelectorModule
  ],
  exports: [
    FadqPlaceSelectorModule,
    FadqPoiSelectorModule
  ],
  declarations: []
})
export class FadqNavigationModule {}
