import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IgoModule,
         provideIChercheSearchSource,
         provideNominatimSearchSource,
         provideDataSourceSearchSource,
         provideConfigOptions,
         RouteService } from '@igo2/igo2';

import { environment } from '../environments/environment';
import { PortalModule } from './pages';
import { AppComponent } from './app.component';

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
    provideConfigOptions({
      default: environment.igo,
      path: './config/config.json'
    }),
    RouteService,
    provideNominatimSearchSource(),
    provideIChercheSearchSource(),
    provideDataSourceSearchSource()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
