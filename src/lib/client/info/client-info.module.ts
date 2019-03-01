import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibClientInfoAddressesModule } from './client-info-addresses/client-info-addresses.module';
import { provideClientInfoService } from './shared/client-info.providers';

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
