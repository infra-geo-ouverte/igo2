import { NgModule } from '@angular/core';

import { IgoGestureModule } from '@igo2/core/gesture';
import {
  IgoDirectionsModule,
  IgoQueryModule,
  IgoSearchModule,
  provideOptionsApi,
  provideStyleListOptions
} from '@igo2/geo';
import { AnalyticsListenerService } from '@igo2/integration';

import { PortalComponent } from './portal.component';

@NgModule({
  imports: [
    IgoGestureModule.forRoot(),
    IgoQueryModule.forRoot(),
    IgoSearchModule,
    IgoDirectionsModule,
    PortalComponent
  ],
  exports: [PortalComponent],
  providers: [
    AnalyticsListenerService,
    provideOptionsApi(),
    provideStyleListOptions({
      path: './assets/list-style.json'
    })
  ]
})
export class PortalModule {}
