import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibDynamicOutletModule } from './dynamic-outlet/dynamic-outlet.module';
import { FadqLibSpinnerModule } from './spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibDynamicOutletModule,
    FadqLibSpinnerModule
  ],
  declarations: [],
  providers: []
})
export class FadqLibCommonModule {}
