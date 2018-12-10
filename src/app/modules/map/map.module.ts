import { NgModule, ModuleWithProviders } from '@angular/core';

import { FadqLibMapModule } from 'src/lib/map/map.module';

import { MapState } from './map.state';

@NgModule({
  imports: [
    FadqLibMapModule
  ],
  exports: [
    FadqLibMapModule
  ],
  declarations: []
})
export class FadqMapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqMapModule,
      providers: [
        MapState
      ]
    };
  }
}
