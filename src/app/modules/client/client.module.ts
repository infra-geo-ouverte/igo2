import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientService,
  provideClientInfoService,
  provideClientParcelService,
  provideClientParcelYearService,
  provideClientSchemaService
} from './shared/client.provider';

import { FadqClientInfoModule } from './client-info/client-info.module';
import { FadqClientLegendModule } from './client-legend/client-legend.module';
import { FadqClientDiagramSelectorModule } from './client-diagram-selector/client-diagram-selector.module';
import { FadqClientParcelYearSelectorModule } from './client-parcel-year-selector/client-parcel-year-selector.module';
import { FadqClientSchemaUpdateFormModule } from './client-schema-update-form/client-schema-update-form.module';
import { FadqClientSchemaSelectorModule } from './client-schema-selector/client-schema-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FadqClientInfoModule,
    FadqClientLegendModule,
    FadqClientDiagramSelectorModule,
    FadqClientParcelYearSelectorModule,
    FadqClientSchemaUpdateFormModule,
    FadqClientSchemaSelectorModule
  ],
  exports: [
    FadqClientInfoModule,
    FadqClientLegendModule,
    FadqClientDiagramSelectorModule,
    FadqClientParcelYearSelectorModule,
    FadqClientSchemaUpdateFormModule,
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
        provideClientParcelYearService(),
        provideClientSchemaService(),
        provideClientService()
      ]
    };
  }
}
