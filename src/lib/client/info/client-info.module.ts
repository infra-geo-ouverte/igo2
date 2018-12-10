import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideClientInfoService } from './shared/client-info.providers';

import { FadqLibClientInfoAddressesModule } from './client-info-addresses/client-info-addresses.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibClientInfoAddressesModule
  ],
  declarations: []
})
export class FadqLibClientInfoModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibClientInfoModule,
      providers: [
        provideClientInfoService()
      ]
    };
  }
}
