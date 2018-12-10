import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientParcelService,
  provideClientParcelYearService
} from './shared/client-parcel.providers';

import { FadqLibClientParcelLegendModule } from './client-parcel-legend/client-parcel-legend.module';
import { FadqLibClientParcelDiagramSelectorModule } from './client-parcel-diagram-selector/client-parcel-diagram-selector.module';
import { FadqLibClientParcelYearSelectorModule } from './client-parcel-year-selector/client-parcel-year-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FadqLibClientParcelLegendModule,
    FadqLibClientParcelDiagramSelectorModule,
    FadqLibClientParcelYearSelectorModule
  ],
  exports: [
    FadqLibClientParcelLegendModule,
    FadqLibClientParcelDiagramSelectorModule,
    FadqLibClientParcelYearSelectorModule
  ],
  declarations: []
})
export class FadqLibClientParcelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibClientParcelModule,
      providers: [
        provideClientParcelService(),
        provideClientParcelYearService()
      ]
    };
  }
}
