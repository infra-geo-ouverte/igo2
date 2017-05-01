import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Http } from '@angular/http';

import { IgoModule, provideDefaultSearchSources,
         LanguageLoader, provideLanguageService,
         provideContextServiceOptions } from 'igo2';

import { PortalModule, PortalRoutingModule } from './pages';
import { AppComponent } from './app.component';


export function translateLoader(http: Http) {
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
    ...provideDefaultSearchSources({
        limit: 5
    }),
    provideContextServiceOptions({
      basePath: './contexts',
      contextListFile: '_contexts.json'
    }),
    provideLanguageService({
      loader: translateLoader
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
