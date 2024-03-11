import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  Provider,
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
import { IgoCoreModule } from '@igo2/core';
import { ConfigService, provideConfigOptions } from '@igo2/core/config';
import { provideRootTranslation } from '@igo2/core/language';
import { IgoMessageModule } from '@igo2/core/message';
import { RouteService } from '@igo2/core/route';
import { loadTheme } from '@igo2/utils';

import 'hammerjs';

import { AppComponent } from './app/app.component';
import { PortalModule } from './app/pages';
import { environment } from './environments/environment';

const DEFAULT_THEME: string = 'blue-theme';

const TOOLTIP_OPTIONS: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 0,
  touchendHideDelay: 0,
  disableTooltipInteractivity: true
};

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
    provideTheme(),
    RouteService,
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: TOOLTIP_OPTIONS },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' }
    }
  ]
}).catch((err) => console.log(err));

function provideTheme(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: (configService: ConfigService, document: Document) => () => {
      const theme = configService.getConfig('theme', DEFAULT_THEME);
      loadTheme(document, theme);
    },
    deps: [ConfigService, DOCUMENT],
    multi: true
  };
}
