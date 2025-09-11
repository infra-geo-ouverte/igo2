import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  EnvironmentProviders,
  inject,
  provideAppInitializer
} from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions
} from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { provideAuthentification } from '@igo2/auth';
import { withMicrosoftSupport } from '@igo2/auth/microsoft';
import { provideIcon } from '@igo2/common/icon';
import { IgoCoreModule } from '@igo2/core';
import { ConfigService, provideConfig } from '@igo2/core/config';
import { provideTranslation, withAsyncConfig } from '@igo2/core/language';
import { IgoMessageModule } from '@igo2/core/message';
import { RouteService } from '@igo2/core/route';
import { provideOffline } from '@igo2/geo';
import { loadTheme } from '@igo2/utils';

import { first } from 'rxjs';
import { environment } from 'src/environments';

import { PortalModule } from './pages';

const DEFAULT_THEME = 'blue-theme';

const TOOLTIP_OPTIONS: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 0,
  touchendHideDelay: 0,
  disableTooltipInteractivity: true
};

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      IgoCoreModule,
      IgoMessageModule,
      PortalModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.igo.app.pwa.enabled,
        registrationStrategy: 'registerWithDelay:5000'
      })
    ),
    provideHttpClient(),
    provideAnimations(),
    provideRouter([]),
    provideConfig({
      default: environment.igo,
      path: './config/config.json'
    }),
    provideTranslation(withAsyncConfig()),
    provideAuthentification(
      withMicrosoftSupport('add'),
      withMicrosoftSupport('b2c')
    ),
    provideOffline(environment.igo.app.offline),
    provideIcon(),
    provideTheme(),
    RouteService,
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: TOOLTIP_OPTIONS },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' }
    }
  ]
};

function provideTheme(): EnvironmentProviders {
  return provideAppInitializer(() => {
    const initializerFn = () => {
      const configService = inject(ConfigService);
      const document = inject(DOCUMENT);
      configService.isLoaded$
        .pipe(first((isLoaded) => isLoaded))
        .subscribe(() => {
          const theme = configService.getConfig('theme', DEFAULT_THEME);
          if (theme === DEFAULT_THEME) {
            return;
          }
          loadTheme(document, theme);
          document.body.classList.remove(DEFAULT_THEME);
          document.body.classList.add(theme);
        });
      return;
    };
    return initializerFn();
  });
}
