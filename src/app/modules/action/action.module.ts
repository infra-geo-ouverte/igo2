import { NgModule } from '@angular/core';

import { FadqLibActionModule } from 'src/lib/action/action.module';

@NgModule({
  imports: [
    FadqLibActionModule
  ],
  exports: [
    FadqLibActionModule
  ],
  declarations: []
})
export class FadqActionModule {}
