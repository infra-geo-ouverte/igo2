import { NgModule, ModuleWithProviders } from '@angular/core';

import { FadqLibAddressEditorModule } from './address-editor/address-editor.module';
import { provideAddressService } from './shared/address.providers';

@NgModule({
  imports: [FadqLibAddressEditorModule],
  declarations: [],
  exports: [
    FadqLibAddressEditorModule
  ]
})
export class FadqLibAddressModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibAddressModule,
      providers: [
        provideAddressService()
      ]
    };
  }
}
