import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MapOverlayComponent } from './map-overlay.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [MapOverlayComponent],
  declarations: [MapOverlayComponent]
})
export class MapOverlayModule {}
