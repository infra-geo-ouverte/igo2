import { NgModule } from '@angular/core';

import { FadqLibMapModule } from 'src/lib/map/map.module';
import { FadqMapToolModule } from './map-tool/map-tool.module';

@NgModule({
  imports: [
    FadqLibMapModule,
    FadqMapToolModule
  ],
  exports: [
    FadqLibMapModule
  ],
  declarations: []
})
export class FadqMapModule {}
