import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqPlaceSelectorModule } from './place-selector/place-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FadqPlaceSelectorModule
  ],
  exports: [
    FadqPlaceSelectorModule
  ],
  declarations: []
})
export class FadqNavigationModule {}
