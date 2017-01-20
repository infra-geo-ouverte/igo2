import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map.component';

@NgModule({
  imports: [CommonModule],
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
