import { NgModule, ModuleWithProviders } from '@angular/core';

import { FadqLibEditionModule } from 'src/lib/edition/edition.module';

import { EditionState } from './edition.state';

@NgModule({
  imports: [
    FadqLibEditionModule
  ],
  exports: [
    FadqLibEditionModule
  ],
  declarations: []
})
export class FadqEditionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqEditionModule,
      providers: [
        EditionState
      ]
    };
  }
}
