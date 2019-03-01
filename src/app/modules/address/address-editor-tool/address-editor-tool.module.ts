import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AddressEditorToolComponent } from './address-editor-tool.component';

/**
 * @ignore
 */
@NgModule({
  imports: [],
  declarations: [AddressEditorToolComponent],
  exports: [AddressEditorToolComponent],
  entryComponents: [AddressEditorToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqAddressEditorToolModule {}
