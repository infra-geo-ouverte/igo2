import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientService,
  provideClientInfoService,
  provideClientSchemaService
} from './shared/client.provider';
import { ClientStoreService } from './shared/client-store.service';

import { FadqClientInfoModule } from './client-info/client-info.module';
import { FadqClientLegendModule } from './client-legend/client-legend.module';
import { FadqClientSchemaFormModule } from './client-schema-form/client-schema-form.module';
import { FadqClientSchemaSelectorModule } from './client-schema-selector/client-schema-selector.module';
import { FadqClientSchemaTableModule } from './client-schema-table/client-schema-table.module';

@NgModule({
  imports: [
    CommonModule,
    FadqClientInfoModule,
    FadqClientLegendModule,
    FadqClientSchemaFormModule,
    FadqClientSchemaSelectorModule,
    FadqClientSchemaTableModule
  ],
  exports: [
    FadqClientInfoModule,
    FadqClientLegendModule,
    FadqClientSchemaFormModule,
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
