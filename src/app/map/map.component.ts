import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStore } from '../app.store';
import { NgMap } from './shared/map';
import { MapService } from '../core/map.service';
import { LayerService } from './shared/layer.service';
import { LayerOptions } from './shared/layers/layer';

@Component({
  selector: 'igo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.styl'],
  providers: [ LayerService ]
})
export class MapComponent implements OnInit, AfterViewInit {

  map: NgMap;
  id: string = 'igo-map-target';

  constructor(private store: Store<AppStore>,
              private mapService: MapService,
              private layerService: LayerService) {}

  ngOnInit() {
    this.map = this.mapService.getMap();

    this.store
      .select(s => s.mapView)
      .subscribe((view: olx.ViewOptions) => this.map.setView(view));

    this.store
      .select(s => s.mapLayers)
      .subscribe((layers: LayerOptions[]) => {
        // TODO: Handle dynamically added layers

        let layer;
        layers.forEach((layerOptions) => {
          layer = this.layerService.createLayer(layerOptions);
          this.map.addLayer(layer);
        });
      });
  }

  ngAfterViewInit(): any {
    this.map.olMap.setTarget(this.id);
  }
}
