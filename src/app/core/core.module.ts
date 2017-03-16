import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { MissingTranslationHandler } from 'ng2-translate';

import { IgoMissingTranslationHandler } from './language/missing-translation.guard';
import { LanguageService } from './language/language.service';
import { throwIfAlreadyLoaded } from './module-import.guard';

import { MediaService } from './media.service';
import { LoggingService } from './logging';
import { RequestService } from './request.service';
import { MessageService } from './message';

import { SpinnerComponent } from './spinner/spinner.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports: [
    SpinnerComponent,
    MessageComponent
  ],
  declarations: [
    SpinnerComponent,
    MessageComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        LanguageService,
        {
          provide: MissingTranslationHandler,
          useClass: IgoMissingTranslationHandler
        },
        LoggingService,
        MediaService,
        RequestService,
        MessageService
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
