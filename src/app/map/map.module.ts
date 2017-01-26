import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { MapComponent } from './map.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [MapComponent],
  declarations: [MapComponent]
})

export class MapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MapModule,
      providers: []
    };
  }
}
