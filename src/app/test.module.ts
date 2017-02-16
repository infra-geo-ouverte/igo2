import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/locale', '.json');
}

@NgModule({
  imports: [
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    MaterialModule.forRoot()
  ],
  exports: [
    HttpModule,
    MaterialModule,
    TranslateModule
  ]
})

export class TestModule { }
