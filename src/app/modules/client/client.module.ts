import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientService,
  provideClientInfoService,
  provideClientParcelService,
  provideClientSchemaService
} from './shared/client.provider';
import { ClientStoreService } from './shared/client-store.service';

import { FadqClientInfoModule } from './client-info/client-info.module';
import { FadqClientLegendModule } from './client-legend/client-legend.module';
import { FadqClientSchemaFormModule } from './client-schema-form/client-schema-form.module';
import { FadqClientSchemaSelectorModule } from './client-schema-selector/client-schema-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FadqClientInfoModule,
    FadqClientLegendModule,
    FadqClientSchemaFormModule,
    FadqClientSchemaSelectorModule
  ],
  exports: [
    FadqClientInfoModule,
    FadqClientLegendModule,
    FadqClientSchemaFormModule,
    FadqClientSchemaSelectorModule
  ],
  declarations: []
})
export class FadqClientModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqClientModule,
      providers: [
        provideClientInfoService(),
        provideClientParcelService(),
        provideClientSchemaService(),
        provideClientService(),
        ClientStoreService
      ]
    };
  }
}
