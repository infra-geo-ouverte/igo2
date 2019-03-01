import { NgModule, ModuleWithProviders } from '@angular/core';

import { FadqLibClientModule } from 'src/lib/client/client.module';
import { FadqClientToolModule } from './client-tool/client-tool.module';

import { ClientParcelEditor } from './shared/client-parcel.editor';
import { ClientSchemaEditor } from './shared/client-schema.editor';
import { ClientSchemaElementEditor } from './shared/client-schema-element.editor';
import { ClientState } from './client.state';

@NgModule({
  imports: [
    FadqLibClientModule.forRoot(),
    FadqClientToolModule
  ],
  exports: [
    FadqLibClientModule
  ],
  declarations: []
})
export class FadqClientModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqClientModule,
      providers: [
        ClientParcelEditor,
        ClientSchemaEditor,
        ClientSchemaElementEditor
      ]
    };
  }
}
