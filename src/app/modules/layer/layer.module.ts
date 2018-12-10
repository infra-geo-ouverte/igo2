import { NgModule } from '@angular/core';

import { FadqLibLayerModule } from 'src/lib/layer/layer.module';

@NgModule({
  imports: [
    FadqLibLayerModule
  ],
  exports: [
    FadqLibLayerModule
  ],
  declarations: []
})
export class FadqLayerModule {}
