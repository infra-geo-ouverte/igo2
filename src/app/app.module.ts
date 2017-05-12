import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Http } from '@angular/http';

import { IgoModule, provideSearchSourceOptions,
         provideIChercheSearchSource,
         provideNominatimSearchSource,
         provideDataSourceSearchSource,
         LanguageLoader, provideLanguageLoader,
         provideContextServiceOptions } from 'igo2';

import { PortalModule, PortalRoutingModule } from './pages';
import { AppComponent } from './app.component';


export function languageLoader(http: Http) {
  return new LanguageLoader(http, './assets/locale/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    IgoModule.forRoot(),

    PortalModule,
    PortalRoutingModule
  ],
  providers: [
    provideSearchSourceOptions({
      limit: 5
    }),
    provideNominatimSearchSource(),
    provideIChercheSearchSource(),
    provideDataSourceSearchSource(),
    provideContextServiceOptions({
      basePath: './contexts',
      contextListFile: '_contexts.json'
    }),
    provideLanguageLoader(languageLoader)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
