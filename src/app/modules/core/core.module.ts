import { NgModule } from '@angular/core';

import { FadqLibCoreModule } from 'src/lib/core/core.module';

@NgModule({
  imports: [
    FadqLibCoreModule.forRoot()
  ],
  exports: [
    FadqLibCoreModule
  ],
  declarations: []
})
export class FadqCoreModule {}
