import { NgModule } from '@angular/core';

import { FadqLibNavigationModule } from 'src/lib/navigation/navigation.module';
import { FadqNavigationToolModule } from './navigation-tool/navigation-tool.module';

@NgModule({
  imports: [
    FadqLibNavigationModule,
    FadqNavigationToolModule
  ],
  exports: [
    FadqLibNavigationModule
  ],
  declarations: []
})
export class FadqNavigationModule {}
