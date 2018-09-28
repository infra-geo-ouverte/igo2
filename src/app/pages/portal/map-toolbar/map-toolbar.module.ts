import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoLanguageModule } from '@igo2/core';
import { IgoToolModule } from '@igo2/context'

import { MapToolbarComponent } from './map-toolbar.component';

@NgModule({
  imports: [
    CommonModule,

    IgoLanguageModule,
    IgoToolModule
  ],
  exports: [MapToolbarComponent],
  declarations: [MapToolbarComponent]
})
export class FadqMapToolbarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqMapToolbarModule
    };
  }
}
