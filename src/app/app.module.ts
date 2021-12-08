import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import {
  provideConfigOptions,
  IgoMessageModule,
  IgoGestureModule,
  RouteService,
  LanguageService
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
  provideOsrmDirectionsSource,
  provideOptionsApi,
  provideCadastreSearchSource,
  provideStyleListOptions
} from '@igo2/geo';

import { PwaService } from './services/pwa.service';

import { environment } from '../environments/environment';
import { PortalModule } from './pages';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

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
    PortalModule,
    HammerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
    provideOsrmDirectionsSource(),
    provideOptionsApi(),
    provideCadastreSearchSource(),
    {provide: APP_INITIALIZER, useFactory: appInitializerFactory, deps: [LanguageService, PwaService, Injector], multi: true},
    provideStyleListOptions({
      path: './assets/list-style.json'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function appInitializerFactory(languageService: LanguageService, pwaService: PwaService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
      languageService.translate.getTranslation(languageService.getLanguage()).subscribe(() => {
        console.info(`Successfully initialized '${languageService.getLanguage()}' language.'`);
        pwaService.initPwaPrompt();
      }, err => {
        console.error(`Problem with '${languageService.getLanguage()}' language initialization.'`);
      }, () => {
        resolve(null);
      });
  });
}
