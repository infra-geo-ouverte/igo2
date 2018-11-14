import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientService,
  provideClientInfoService,
  provideClientSchemaService
} from './shared/client.provider';
import { ClientStoreService } from './shared/client-store.service';

import { FadqClientInfoModule } from './client-info/client-info.module';
import { FadqClientSchemasTableModule } from './client-schemas-table/client-schemas-table.module';

@NgModule({
  imports: [
    CommonModule,
    FadqClientInfoModule,
    FadqClientSchemasTableModule
  ],
  exports: [
    FadqClientInfoModule,
    FadqClientSchemasTableModule
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
