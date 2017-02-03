import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MissingTranslationHandler} from 'ng2-translate';

import { IgoMissingTranslationHandler } from './language/missing-translation.guard';
import { LanguageService } from './language/language.service';
import { throwIfAlreadyLoaded } from './module-import.guard';
import { ToolService } from './tool.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: []
})

export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ToolService,
        LanguageService,
        { provide: MissingTranslationHandler, useClass: IgoMissingTranslationHandler }
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
