import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoSpinnerModule } from '@igo2/common';

import { SpinnerActivityDirective } from './spinner-activity.directive';

@NgModule({
  imports: [
    CommonModule,
    IgoSpinnerModule
  ],
  declarations: [
    SpinnerActivityDirective
  ],
  exports: [
    IgoSpinnerModule,
    SpinnerActivityDirective
  ]
})
export class FadqSpinnerModule {}
