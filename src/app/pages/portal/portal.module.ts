import { NgModule } from '@angular/core';

import { IgoGestureModule } from '@igo2/core';
import {
  IgoDirectionsModule,
  IgoQueryModule,
  IgoSearchModule,
  provideCadastreSearchSource,
  provideCoordinatesReverseSearchSource,
  provideIChercheReverseSearchSource,
  provideIChercheSearchSource,
  provideILayerSearchSource,
  provideNominatimSearchSource,
  provideOptionsApi,
  provideOsrmDirectionsSource,
  provideStoredQueriesSearchSource,
  provideStyleListOptions,
  provideWorkspaceSearchSource
} from '@igo2/geo';
import { AnalyticsListenerService } from '@igo2/integration';

import { PortalComponent } from './portal.component';

@NgModule({
  imports: [
    IgoGestureModule.forRoot(),
    IgoQueryModule.forRoot(),
    IgoSearchModule.forRoot(),
    IgoDirectionsModule,
    PortalComponent
  ],
  exports: [PortalComponent],
  providers: [
    AnalyticsListenerService,
    provideNominatimSearchSource(),
    provideIChercheSearchSource(),
    provideWorkspaceSearchSource(),
    provideIChercheReverseSearchSource(),
    provideCoordinatesReverseSearchSource(),
    provideILayerSearchSource(),
    provideStoredQueriesSearchSource(),
    provideOsrmDirectionsSource(),
    provideOptionsApi(),
    provideCadastreSearchSource(),
    provideStyleListOptions({
      path: './assets/list-style.json'
    })
  ]
})
export class PortalModule {}
