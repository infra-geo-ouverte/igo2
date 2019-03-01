import { NgModule } from '@angular/core';

import { FadqLibMapModule } from 'src/lib/map/map.module';

@NgModule({
  imports: [
    FadqLibMapModule
  ],
  exports: [
    FadqLibMapModule
  ],
  declarations: []
})
export class FadqMapModule {}
