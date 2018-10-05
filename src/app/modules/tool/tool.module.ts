import { NgModule, ModuleWithProviders } from '@angular/core';

import { FadqSearchClientToolModule } from './search-client-tool/search-client-tool.module';
import { FadqEditAddressesToolModule } from './edit-addresses-tool/edit-addresses-tool.module';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    FadqSearchClientToolModule,
    FadqEditAddressesToolModule
  ]
})
export class FadqToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqToolModule,
      providers: []
    };
  }
}
