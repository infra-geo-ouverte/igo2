import { NgModule } from '@angular/core';

import {
  IgoDirectionsModule,
  IgoQueryModule,
  IgoSearchModule,
  provideOptionsApi
} from '@igo2/geo';
import { AnalyticsListenerService } from '@igo2/integration';

import { PortalComponent } from './portal.component';

@NgModule({
  imports: [
    IgoQueryModule.forRoot(),
    IgoSearchModule,
    IgoDirectionsModule,
    PortalComponent
  ],
  exports: [PortalComponent],
  providers: [AnalyticsListenerService, provideOptionsApi()]
})
export class PortalModule {}
