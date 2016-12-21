import { NgModule, ModuleWithProviders } from '@angular/core';
import {Http} from '@angular/http';
import { CoreModule } from "../core";
import { AuthModule } from './auth/index';

import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    CoreModule,
    AuthModule,
    TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
    })
  ],
  declarations: [],
  exports: [CoreModule, AuthModule, TranslateModule]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
