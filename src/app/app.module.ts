import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Http } from '@angular/http';

import { IgoModule, provideDefaultSearchSources,
         LanguageLoader, provideLanguageService } from 'igo2';

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
    /*{
      provide: SearchSource,
      useFactory: (http: Http) => {
        return new SearchSourceNominatim(http, {limit: 4})
      },
      multi: true,
      deps: [Http]
    },*/
    provideLanguageService({
      loader: translateLoader
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
