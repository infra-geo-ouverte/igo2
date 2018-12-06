import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerActivityDirective } from './spinner-activity.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpinnerActivityDirective
  ],
  exports: [
    SpinnerActivityDirective
  ]
})
export class FadqSpinnerModule {}
