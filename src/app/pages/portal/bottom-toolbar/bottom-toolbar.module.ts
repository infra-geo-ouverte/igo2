import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoLanguageModule } from '@igo2/core';
import { IgoToolModule } from '@igo2/context'

import { BottomToolbarComponent } from './bottom-toolbar.component';

@NgModule({
  imports: [
    CommonModule,

    IgoLanguageModule,
    IgoToolModule
  ],
  exports: [BottomToolbarComponent],
  declarations: [BottomToolbarComponent]
})
export class FadqBottomToolbarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqBottomToolbarModule
    };
  }
}
