import { NgModule } from '@angular/core';

import { FadqLibFeatureModule } from 'src/lib/feature/feature.module';

@NgModule({
  imports: [
    FadqLibFeatureModule
  ],
  exports: [
    FadqLibFeatureModule
  ],
  declarations: []
})
export class FadqFeatureModule {}
