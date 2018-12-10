import { NgModule, ModuleWithProviders } from '@angular/core';

import { FadqLibClientModule } from 'src/lib/client/client.module';
import { FadqClientToolModule } from './client-tool/client-tool.module';

import { ClientState } from './client.state';

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
export class FadqClientModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqClientModule,
      providers: [
        ClientState
      ]
    };
  }
}
