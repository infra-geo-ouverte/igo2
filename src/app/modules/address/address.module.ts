import { NgModule } from '@angular/core';
import { FadqLibAddressModule } from 'src/lib/address/address.module';
import { FadqAddressEditorToolModule } from './address-editor-tool/address-editor-tool.module';


@NgModule({
  imports: [FadqLibAddressModule.forRoot(), FadqAddressEditorToolModule],
  declarations: [],
  exports: [
    FadqAddressEditorToolModule
  ]
})
export class FadqAddressModule {}
