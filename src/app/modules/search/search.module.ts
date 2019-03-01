import { NgModule, ModuleWithProviders } from '@angular/core';

import { IgoSearchModule, provideIChercheSearchSource } from '@igo2/geo';

import { provideClientSearchSource } from './shared/sources/client.providers';
import { provideFadqIChercheSearchResultFormatter } from './shared/sources/icherche';

@NgModule({
  imports: [
    IgoSearchModule.forRoot()
  ],
  exports: [
    IgoSearchModule
  ],
  declarations: []
})
export class FadqSearchModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqSearchModule,
      providers: [
        provideFadqIChercheSearchResultFormatter(),
        provideClientSearchSource(),
        provideIChercheSearchSource()
      ]
    };
  }
}
