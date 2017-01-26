import { Component, OnInit, Input, HostBinding, AfterViewInit } from '@angular/core';

import { MapOptions } from './shared/map.interface';
import { NgMap } from './shared/map.model';
import { MapService } from './shared/map.service';
import { LayerOptions } from './shared/layers/layer.interface';
import { LayerService } from './shared/layers/layer.service';

let nextId = 0;

@Component({
  selector: 'igo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.styl'],
  providers: [
    MapService,
    LayerService
  ],
})
export class MapComponent implements OnInit, AfterViewInit {

  @Input() options: MapOptions;
  @Input() layers: LayerOptions[];

  id = `igo-map-${nextId++}`;
  map: NgMap;

  constructor(private mapService: MapService, private layerService: LayerService) {}

  ngOnInit(): any {
    this.map = this.mapService.createMap(this.options);

    let layer;
    for (const layerOptions of this.layers || []) {
      layer = this.layerService.createLayer(layerOptions);
      this.map.addLayer(layer);
    }
  }

  ngAfterViewInit(): any {
    this.map.olMap.setTarget(this.id);
  }
}
