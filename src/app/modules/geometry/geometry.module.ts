import { NgModule } from '@angular/core';

import { FadqLibGeometryModule } from 'src/lib/geometry/geometry.module';

@NgModule({
  imports: [
    FadqLibGeometryModule
  ],
  exports: [
    FadqLibGeometryModule
  ],
  declarations: []
})
export class FadqGeometryModule {}
