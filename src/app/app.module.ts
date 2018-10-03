import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  provideConfigOptions,
  IgoMessageModule,
  RouteService
} from '@igo2/core';
import { IgoSpinnerModule, IgoStopPropagationModule } from '@igo2/common';
import {
  provideIChercheSearchSource,
  provideNominatimSearchSource,
  provideDataSourceSearchSource
} from '@igo2/geo';

import { environment } from '../environments/environment';
import { FadqMapModule } from './modules';
import { PortalModule } from './pages';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    IgoMessageModule,
    IgoSpinnerModule,
    IgoStopPropagationModule,
    FadqMapModule.forRoot(),
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
    provideDataSourceSearchSource()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
