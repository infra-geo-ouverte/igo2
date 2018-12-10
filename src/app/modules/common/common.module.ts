import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqDynamicContainerModule } from './dynamic-container/dynamic-container.module';
import { FadqSpinnerModule } from './spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqDynamicContainerModule,
    FadqSpinnerModule
  ],
  declarations: [],
  providers: []
})
export class FadqCommonModule {}
