import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibDynamicOutletModule } from './dynamic-outlet/dynamic-outlet.module';
import { FadqLibSpinnerModule } from './spinner/spinner.module';
import { DynamicComponentService } from './shared/dynamic-component.service';

@NgModule({
  imports: [
    CommonModule,
    FadqLibDynamicOutletModule,
    FadqLibSpinnerModule
  ],
  exports: [
    FadqLibDynamicOutletModule,
    FadqLibSpinnerModule
  ],
  providers: [
    DynamicComponentService
  ]
})
export class FadqLibCommonModule {}
