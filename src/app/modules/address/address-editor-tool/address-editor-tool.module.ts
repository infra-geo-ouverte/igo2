import { NgModule } from '@angular/core';
import { FadqLibAddressModule } from 'src/lib/address/address.module';
import { AddressEditorToolComponent } from './address-editor-tool.component';

/**
 * @ignore
 */
@NgModule({
  imports: [ FadqLibAddressModule ],
  declarations: [ AddressEditorToolComponent ],
  exports: [ AddressEditorToolComponent ],
  entryComponents: [ AddressEditorToolComponent ]
})
export class FadqAddressEditorToolModule {}
