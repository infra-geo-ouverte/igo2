import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NavigatorModule, NavigatorRoutingModule } from './pages';

import { AppComponent } from './app.component';


export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/locale', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
    }),
    RouterModule.forRoot([]),
    MaterialModule.forRoot(),

    CoreModule.forRoot(),
    SharedModule.forRoot(),

    NavigatorModule,
    NavigatorRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
