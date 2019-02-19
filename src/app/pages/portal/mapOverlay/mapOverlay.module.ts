import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MapOverlayComponent } from './mapOverlay.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [MapOverlayComponent],
  declarations: [MapOverlayComponent]
})
export class MapOverlayModule {}
