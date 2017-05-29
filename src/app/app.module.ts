import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';

import { IgoModule, provideSearchSourceOptions,
         provideIChercheSearchSource,
         provideNominatimSearchSource,
         provideDataSourceSearchSource,
         LanguageLoader, provideLanguageLoader,
         provideContextServiceOptions } from 'igo2';

import { PortalModule } from './pages';
import { AppComponent } from './app.component';


const IGO_CONFIG = window['IGO_CONFIG'] || {};
const LOCALE_PATH = IGO_CONFIG['locale'] || './assets/locale/';
const CONTEXT_SERVICE = IGO_CONFIG['contextService'] || {
  basePath: './contexts',
  contextListFile: '_contexts.json'
};

export function languageLoader(http: Http) {
  return new LanguageLoader(http, LOCALE_PATH, '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    IgoModule.forRoot(),

    PortalModule
  ],
  providers: [
    provideSearchSourceOptions({
      limit: 5
    }),
    provideNominatimSearchSource(),
    provideIChercheSearchSource(),
    provideDataSourceSearchSource(),
    provideContextServiceOptions(CONTEXT_SERVICE),
    provideLanguageLoader(languageLoader)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
