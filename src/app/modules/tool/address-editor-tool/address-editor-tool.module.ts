import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { AddressEditorToolComponent } from './address-editor-tool.component';

@NgModule({
  imports: [],
  declarations: [AddressEditorToolComponent],
  exports: [AddressEditorToolComponent],
  entryComponents: [AddressEditorToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqAddressEditorToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqAddressEditorToolModule,
      providers: []
    };
  }
}
