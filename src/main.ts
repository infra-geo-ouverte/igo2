import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  Injector,
  enableProdMode,
  importProvidersFrom
} from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions
} from '@angular/material/tooltip';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { IgoAuthModule } from '@igo2/auth';
import {
  ConfigService,
  IgoCoreModule,
  IgoMessageModule,
  RouteService,
  provideConfigOptions,
  provideRootTranslation
} from '@igo2/core';
import { loadTheme } from '@igo2/utils';

import 'hammerjs';

import { AppComponent } from './app/app.component';
import { PortalModule } from './app/pages';
import { environment } from './environments/environment';

const TOOLTIP_OPTIONS: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 0,
  touchendHideDelay: 0,
  disableTooltipInteractivity: true
};

const DEFAULT_THEME: string = 'blue-theme';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      IgoCoreModule.forRoot(),
      IgoAuthModule.forRoot(),
      IgoMessageModule,
      PortalModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.igo.app.pwa.enabled,
        registrationStrategy: 'registerWithDelay:5000'
      })
    ),
    provideRootTranslation(),
    provideHttpClient(),
    provideAnimations(),
    provideRouter([]),
    provideConfigOptions({
      default: environment.igo,
      path: './config/config.json'
    }),
    RouteService,
    {
      provide: APP_INITIALIZER,
      useFactory: provideTheme,
      deps: [Injector, DOCUMENT],
      multi: true
    },
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: TOOLTIP_OPTIONS },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' }
    }
  ]
}).catch((err) => console.log(err));

function provideTheme(injector: Injector, document: Document) {
  return () => {
    const configService = injector.get(ConfigService);
    const theme = configService.getConfig('theme', DEFAULT_THEME);
    loadTheme(document, theme);
  };
}
