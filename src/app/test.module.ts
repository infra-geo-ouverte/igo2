import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { HttpModule, Http, JsonpModule } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { MediaService } from './core/media.service';
import { LoggingService } from './core/logging.service';
import { RequestService } from './core/request.service';

import { provideIgoStore } from './store/store.module';


export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/locale', '.json');
}

@NgModule({
  imports: [
    HttpModule,
    JsonpModule,
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
  ],
  providers: [
    MediaService,
    LoggingService,
    RequestService,
    provideIgoStore()
  ]
})

export class TestModule { }
