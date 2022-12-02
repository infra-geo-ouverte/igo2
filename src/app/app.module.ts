import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideConfigOptions,
  IgoMessageModule,
  IgoGestureModule,
  RouteService,
  LanguageService,
  ConfigService,
  ConfigOptions,
  CONFIG_OPTIONS
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
import { HeaderModule } from './pages/header/header.module';
import { FooterModule } from './pages/footer/footer.module';
import { ServiceWorkerModule } from '@angular/service-worker';

export let CONFIG_LOADER = new InjectionToken<Promise<ConfigService>>('Config Loader');

function configLoader(
  configService: ConfigService,
  configOptions: ConfigOptions,
): Promise<unknown> {
  const promiseOrTrue = configService.load(configOptions);
  if (promiseOrTrue instanceof Promise) {
    return promiseOrTrue;
  }
  return Promise.resolve();
}
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';

export const defaultTooltipOptions: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 0,
  touchendHideDelay: 0,
  disableTooltipInteractivity: true
};

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
    HeaderModule,
    FooterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerWithDelay:5000' })
  ],
  providers: [
    provideConfigOptions({
      default: environment.igo,
      path: './config/config.json'
    }),
    {
      provide: CONFIG_LOADER,
      useFactory: configLoader,
      deps: [ConfigService, CONFIG_OPTIONS],
    },
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

    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [CONFIG_LOADER, LanguageService, PwaService],
      multi: true
    },
    provideStyleListOptions({
      path: './assets/list-style.json'
    }),
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: defaultTooltipOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

function appInitializerFactory(
  configLoader: Promise<unknown>,
  languageService: LanguageService,
  pwaService: PwaService
) {
  return () => new Promise<any>((resolve: any) => {
    configLoader.then(() => {
      const secondPromises = [languageService.translate.getTranslation(languageService.getLanguage())];
      Promise.all(secondPromises).then(() => {
        const thirdPromises = [pwaService.initPwaPrompt()];
        Promise.all(thirdPromises).then(() => resolve());
      });
    });
  });
}
