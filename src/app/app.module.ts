import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  provideConfigOptions,
  IgoMessageModule,
  IgoGestureModule,
  RouteService
} from '@igo2/core';
import { IgoSpinnerModule, IgoStopPropagationModule } from '@igo2/common';
import { IgoAuthModule } from '@igo2/auth';
import {
  provideIChercheSearchSource,
  provideIChercheReverseSearchSource,
  provideNominatimSearchSource,
  provideCoordinatesReverseSearchSource,
  provideILayerSearchSource,
  provideStoredQueriesSearchSource,
  provideOsrmDirectionsSource
} from '@igo2/geo';

import { environment } from '../environments/environment';
import { PortalModule } from './pages';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    IgoAuthModule.forRoot(),
    IgoGestureModule.forRoot(),
    IgoMessageModule,
    IgoSpinnerModule,
    IgoStopPropagationModule,
    PortalModule
  ],
  providers: [
    provideConfigOptions({
      default: environment.igo,
      path: './config/config.json'
    }),
    RouteService,
    provideNominatimSearchSource(),
    provideIChercheSearchSource(),
    provideIChercheReverseSearchSource(),
    provideCoordinatesReverseSearchSource(),
    provideILayerSearchSource(),
    provideStoredQueriesSearchSource(),
    provideOsrmDirectionsSource()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
