import { Directive, Self, OnInit } from '@angular/core';

import { MapService } from '@igo2/geo';
import { PoiSelectorComponent } from './poi-selector.component';

@Directive({
  selector: '[fadqPoiSelectorBinding]'
})
export class PoiSelectorBindingDirective implements OnInit {
  private component: PoiSelectorComponent;

  constructor(
    @Self() component: PoiSelectorComponent,
    private mapService: MapService
  ) {
    this.component = component;
  }

  ngOnInit() {
    this.component.map = this.mapService.getMap();
  }
}
