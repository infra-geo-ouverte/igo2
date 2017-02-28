import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { MapService } from './shared/map.service';
import { LayerService } from './shared/layer.service';
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
  ],
  providers: [
    LayerService,
    MapService
  ]
})
export class MapModule { }
