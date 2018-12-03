import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientParcelService,
  provideClientParcelYearService
} from './shared/client-parcel.providers';

import { FadqClientParcelLegendModule } from './client-parcel-legend/client-parcel-legend.module';
import { FadqClientParcelDiagramSelectorModule } from './client-parcel-diagram-selector/client-parcel-diagram-selector.module';
import { FadqClientParcelYearSelectorModule } from './client-parcel-year-selector/client-parcel-year-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FadqClientParcelLegendModule,
    FadqClientParcelDiagramSelectorModule,
    FadqClientParcelYearSelectorModule
  ],
  exports: [
    FadqClientParcelLegendModule,
    FadqClientParcelDiagramSelectorModule,
    FadqClientParcelYearSelectorModule
  ],
  declarations: []
})
export class FadqClientParcelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqClientParcelModule,
      providers: [
        provideClientParcelService(),
        provideClientParcelYearService()
      ]
    };
  }
}
