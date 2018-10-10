import { NgModule, ModuleWithProviders } from '@angular/core';

import { FadqAddressEditorToolModule } from './address-editor-tool/address-editor-tool.module';
import { FadqClientInfoToolModule } from './client-info-tool/client-info-tool.module';
import { FadqPlaceSelectorToolModule } from './place-selector-tool/place-selector-tool.module';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    FadqAddressEditorToolModule,
    FadqClientInfoToolModule,
    FadqPlaceSelectorToolModule
  ]
})
export class FadqToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqToolModule,
      providers: []
    };
  }
}
