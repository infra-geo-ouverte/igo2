import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibDynamicContainerModule } from './dynamic-container/dynamic-container.module';
import { FadqLibSpinnerModule } from './spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibDynamicContainerModule,
    FadqLibSpinnerModule
  ],
  declarations: [],
  providers: []
})
export class FadqLibCommonModule {}
