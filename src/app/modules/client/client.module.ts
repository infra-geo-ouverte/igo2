import { NgModule} from '@angular/core';

import { FadqLibClientModule } from 'src/lib/client/client.module';
import { FadqClientToolModule } from './client-tool/client-tool.module';

@NgModule({
  imports: [
    FadqLibClientModule.forRoot(),
    FadqClientToolModule
  ],
  exports: [
    FadqLibClientModule
  ],
  declarations: []
})
export class FadqClientModule {}
