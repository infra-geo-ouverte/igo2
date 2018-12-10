import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibPlaceSelectorModule } from './place-selector/place-selector.module';
import { FadqLibPoiSelectorModule } from './poi-selector/poi-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FadqLibPlaceSelectorModule,
    FadqLibPoiSelectorModule
  ],
  exports: [
    FadqLibPlaceSelectorModule,
    FadqLibPoiSelectorModule
  ],
  declarations: []
})
export class FadqLibNavigationModule {}
