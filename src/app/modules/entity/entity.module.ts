import { NgModule } from '@angular/core';

import { FadqLibEntityModule } from 'src/lib/entity/entity.module';

@NgModule({
  imports: [
    FadqLibEntityModule
  ],
  exports: [
    FadqLibEntityModule
  ],
  declarations: []
})
export class FadqEntityModule {}
