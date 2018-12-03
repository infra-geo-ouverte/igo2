import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideClientInfoService } from './shared/client-info.providers';

import { FadqClientInfoAddressesModule } from './client-info-addresses/client-info-addresses.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqClientInfoAddressesModule
  ],
  declarations: []
})
export class FadqClientInfoModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqClientInfoModule,
      providers: [
        provideClientInfoService()
      ]
    };
  }
}
