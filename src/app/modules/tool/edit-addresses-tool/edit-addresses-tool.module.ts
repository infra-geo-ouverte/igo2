import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { IgoFeatureModule } from '@igo2/geo';
import { EditAddressesToolComponent } from './edit-addresses-tool.component';

@NgModule({
  imports: [IgoFeatureModule],
  declarations: [EditAddressesToolComponent],
  exports: [EditAddressesToolComponent],
  entryComponents: [EditAddressesToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqEditAddressesToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqEditAddressesToolModule,
      providers: []
    };
  }
}
