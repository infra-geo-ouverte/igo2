import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibActionbarModule } from './actionbar/actionbar.module';

@NgModule({
  imports: [
    CommonModule,
    FadqLibActionbarModule
  ],
  exports: [
    FadqLibActionbarModule
  ],
  declarations: [],
  providers: []
})
export class FadqLibActionModule {}
