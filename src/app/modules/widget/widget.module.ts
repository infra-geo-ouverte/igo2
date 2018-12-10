import { NgModule } from '@angular/core';

import { FadqLibWidgetModule } from 'src/lib/widget/widget.module';

@NgModule({
  imports: [
    FadqLibWidgetModule
  ],
  exports: [
    FadqLibWidgetModule
  ],
  declarations: []
})
export class FadqWidgetModule {}
