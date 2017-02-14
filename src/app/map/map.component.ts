import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStore } from '../app.store';
import { NgMap } from './shared/map';
import { MapService } from '../core/map.service';
import { LayerService } from './shared/layer.service';
import { LayerOptions } from './shared/layers/layer';
import { MapViewOptions } from './shared/map';
import { SearchResult } from '../search/shared/search-result.interface';


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
      .subscribe((view: MapViewOptions) => this.map.updateView(view));

    this.store
      .select(s => s.mapLayers)
      .subscribe((layers: LayerOptions[]) => this.handleLayersAdded(layers));

    this.store
      .select(s => s.focusedResult)
      .filter(r => r !== null)
      .subscribe((result: SearchResult) => this.handleFocusedResult(result));

    this.store
      .select(s => s.selectedResult)
      .filter(r => r !== null)
      .subscribe((result: SearchResult) => this.handleSelectedResult(result));
  }

  ngAfterViewInit(): any {
    this.map.olMap.setTarget(this.id);
  }

  private resultToFeature(result: SearchResult) {
    const destProj = this.map.getProjection();

    const format = new ol.format.GeoJSON();
    const feature = format.readFeature(Object.assign({
        type: 'Feature'
    }, result));

    feature.getGeometry().transform('EPSG:4326', destProj);

    return feature;
  }

  private handleLayersAdded(layers: LayerOptions[]) {
    // TODO: Handle dynamically added layers
    let layer;
    layers.forEach((layerOptions) => {
      layer = this.layerService.createLayer(layerOptions);
      this.map.addLayer(layer);
    });
  }

  private handleFocusedResult(result: SearchResult) {
    this.map.clearMarkers();

    const feature = this.resultToFeature(result);
    this.map.addMarker(feature);
    this.map.moveToFeature(feature);
  }

  private handleSelectedResult(result: SearchResult) {
    this.map.clearMarkers();

    const feature = this.resultToFeature(result);
    this.map.addMarker(feature);
    this.map.zoomToFeature(feature);
  }

}
