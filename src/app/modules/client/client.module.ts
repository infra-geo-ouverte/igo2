import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientService,
  provideClientInfoService,
  provideClientSchemaService
} from './shared/client.provider';
import { ClientStoreService } from './shared/client-store.service';

import { FadqClientInfoModule } from './client-info/client-info.module';
import { FadqClientSchemaSelectorModule } from './client-schema-selector/client-schema-selector.module';
import { FadqClientSchemaTableModule } from './client-schema-table/client-schema-table.module';

@NgModule({
  imports: [
    CommonModule,
    FadqClientInfoModule,
    FadqClientSchemaSelectorModule,
    FadqClientSchemaTableModule
  ],
  exports: [
    FadqClientInfoModule,
    FadqClientSchemaSelectorModule,
    FadqClientSchemaTableModule
  ],
  declarations: []
})
export class FadqClientModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqClientModule,
      providers: [
        provideClientInfoService(),
        provideClientSchemaService(),
        provideClientService(),
        ClientStoreService
      ]
    };
  }
}
