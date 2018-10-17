import { NgModule, ModuleWithProviders } from '@angular/core';

import { FadqAddressEditorToolModule } from './address-editor-tool/address-editor-tool.module';
import { FadqClientInfoToolModule } from './client-info-tool/client-info-tool.module';
import { FadqNavigationToolModule } from './navigation-tool/navigation-tool.module';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    FadqAddressEditorToolModule,
    FadqClientInfoToolModule,
    FadqNavigationToolModule
  ]
})
export class FadqToolModule {}
