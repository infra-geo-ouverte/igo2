import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { MissingTranslationHandler } from 'ng2-translate';

import { IgoMissingTranslationHandler } from './language/missing-translation.guard';
import { LanguageService } from './language/language.service';
import { throwIfAlreadyLoaded } from './module-import.guard';

import { MediaService } from './media.service';
import { LoggingService } from './logging.service';
import { RequestService } from './request.service';

import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SpinnerComponent
  ],
  declarations: [
    SpinnerComponent
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
        RequestService
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
