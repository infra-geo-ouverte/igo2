import { DOCUMENT } from '@angular/common';
import {
  APP_INITIALIZER,
  ApplicationRef,
  Injector,
  NgModule
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule
} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions
} from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { IgoAuthModule } from '@igo2/auth';
import { IgoSpinnerModule, IgoStopPropagationModule } from '@igo2/common';
import {
  ConfigService,
  IgoGestureModule,
  IgoMessageModule,
  LanguageService,
  RouteService,
  provideConfigOptions
} from '@igo2/core';
import {
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
import { loadTheme } from '@igo2/utils';

import { concatMap, first } from 'rxjs';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FilterValuesComponent } from './components/filter-values/filter-values.component';
import { FilterComponent } from './components/filter/filter.component';
import { ImmeubleCardComponent } from './components/immeuble-card/immeuble-card.component';
import { NumberPerPageComponent } from './components/number-per-page/number-per-page.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FooterModule } from './layout/footer/footer.module';
import { NavigationMenuComponent } from './layout/navigation-menu/navigation-menu.component';
import { NewHeaderComponent } from './layout/new-header/new-header.component';
import { SearchBarComponent } from './layout/search-bar/search-bar.component';
import { SubMenuComponent } from './layout/sub-menu/sub-menu.component';
import { PortalModule } from './pages';
import { BuildingDetailsComponent } from './pages/building-details/building-details.component';
import { CarteComponent } from './pages/carte/carte.component';
import { ImmeublesComponent } from './pages/immeubles/immeubles.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const DEFAULT_THEME: string = 'blue-theme';

export const defaultTooltipOptions: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 0,
  touchendHideDelay: 0,
  disableTooltipInteractivity: true
};

@NgModule({
  declarations: [
    AppComponent,
    NewHeaderComponent,
    NavigationMenuComponent,
    BreadcrumbComponent,
    SubMenuComponent,
    CarteComponent,
    ImmeublesComponent,
    NotFoundComponent,
    FilterComponent,
    ImmeubleCardComponent,
    PaginatorComponent,
    NumberPerPageComponent,
    FilterValuesComponent,
    BuildingDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    IgoAuthModule.forRoot(),
    IgoGestureModule.forRoot(),
    IgoMessageModule,
    IgoSpinnerModule,
    IgoStopPropagationModule,
    PortalModule,
    FooterModule,
    MatDividerModule,
    MatPaginatorModule,
    SearchBarComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.igo.app.pwa.enabled,
      registrationStrategy: 'registerWithDelay:5000'
    })
  ],
  providers: [
    provideConfigOptions({
      default: environment.igo,
      path: './config/config.json'
    }),
    RouteService,
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
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector, ApplicationRef, DOCUMENT],
      multi: true
    },
    provideStyleListOptions({
      path: './assets/list-style.json'
    }),
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: defaultTooltipOptions },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

function appInitializerFactory(
  injector: Injector,
  applicationRef: ApplicationRef,
  document: Document
) {
  // ensure to have the proper translations loaded once, when the app is stable.
  return () =>
    new Promise<any>((resolve: any) => {
      applicationRef.isStable
        .pipe(
          first((isStable) => isStable === true),
          concatMap(() => {
            const languageService = injector.get(LanguageService);
            const lang = languageService.getLanguage();
            return languageService.translate.getTranslation(lang);
          })
        )
        .subscribe((translations) => {
          const languageService = injector.get(LanguageService);
          const lang = languageService.getLanguage();
          languageService.translate.setTranslation(lang, translations);

          const configService = injector.get(ConfigService);
          const theme = configService.getConfig('theme', DEFAULT_THEME);
          loadTheme(document, theme);
          resolve();
        });
    });
}
