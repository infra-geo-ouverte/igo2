import { NgModule } from '@angular/core';

import { FadqLibOverlayModule } from 'src/lib/overlay/overlay.module';

@NgModule({
  imports: [
    FadqLibOverlayModule
  ],
  exports: [
    FadqLibOverlayModule
  ],
  declarations: []
})
export class FadqOverlayModule {}
