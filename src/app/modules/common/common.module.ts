import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqDynamicContainerModule } from './dynamic-container/dynamic-container.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqDynamicContainerModule
  ],
  declarations: [],
  providers: []
})
export class FadqCommonModule {}
