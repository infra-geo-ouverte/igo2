import { Component, OnInit, Input, HostBinding, AfterViewInit } from '@angular/core';

import { NgMap, MapOptions } from './shared/map.model';
import { MapService } from './shared/map.service';
import { LayerOptions } from './shared/layers/layer.model';
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

  @Input() view: olx.ViewOptions;
  @Input() layers: LayerOptions[];

  id: string = `ngmap-map-${nextId++}`;
  map: NgMap;

  constructor(private mapService: MapService, private layerService: LayerService) {}

  ngOnInit(): any {
    this.map = this.mapService.createMap({
      view: this.view
    });

    for (let layerOptions of this.layers || []) {
      let layer = this.layerService.createLayer(layerOptions);
      this.map.addLayer(layer);
    }
  }

  ngAfterViewInit(): any {
    this.map.olMap.setTarget(this.id);
  }
}
