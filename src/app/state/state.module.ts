import { NgModule, ModuleWithProviders } from '@angular/core';

import { CatalogState } from './catalog.state';
import { ClientState } from './client.state';
import { EditionState } from './edition.state';
import { MapState } from './map.state';
import { SearchState } from './search.state';

@NgModule({
  imports: [],
  exports: [],
  declarations: []
})
export class FadqStateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqStateModule,
      providers: [
        CatalogState,
        ClientState,
        EditionState,
        MapState,
        SearchState
      ]
    };
  }
}
