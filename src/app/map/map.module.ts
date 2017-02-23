import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { MapComponent } from './map/map.component';
import { ZoomComponent } from './zoom/zoom.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [MapComponent],
  declarations: [
    MapComponent,
    ZoomComponent
  ]
})

export class MapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MapModule,
      providers: []
    };
  }
}
