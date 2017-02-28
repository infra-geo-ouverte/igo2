import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { SearchResult } from '../../search/shared/search-result.interface';

import { IgoMap } from '../shared/map';
import { MapService } from '../shared/map.service';
import { LayerService } from '../shared/layer.service';
import { LayerOptions } from '../shared/layers/layer';
import { MapViewOptions } from '../shared/map';


@Component({
  selector: 'igo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.styl']
})
export class MapComponent implements OnInit, AfterViewInit {

  map: IgoMap;
  id: string = 'igo-map-target';

  constructor(private store: Store<IgoStore>,
              private mapService: MapService,
              private layerService: LayerService) {}

  ngOnInit() {
    this.map = this.mapService.getMap();

    this.store
      .select(s => s.mapView)
      .subscribe((view: MapViewOptions) => this.map.setView(view));

    this.store
      .select(s => s.mapLayers)
      .subscribe((layers: LayerOptions[]) => this.handleLayersChanged(layers));

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

    feature.getGeometry().transform(result.projection, destProj);

    return feature;
  }

  private handleLayersChanged(layers: LayerOptions[]) {
    this.map.removeLayers();

    layers.forEach((layerOptions) => {
      this.layerService.createLayer(layerOptions).subscribe(
        layer => this.map.addLayer(layer)
      );
    });
  }

  private handleFocusedResult(result: SearchResult) {
    this.handleResult(result, false);
  }

  private handleSelectedResult(result: SearchResult) {
    this.handleResult(result, true);
  }

  private handleResult(result: SearchResult, zoom: boolean = false) {
    this.map.clearOverlay();

    const feature = this.resultToFeature(result);
    this.map.addMarker(feature);

    let extent;
    if (result.extent) {
      extent = ol.proj.transformExtent(
        result.extent, result.projection, this.map.getProjection());
    }

    if (extent) {
      if (zoom) {
        this.map.zoomToExtent(extent);
      } else {
        this.map.moveToExtent(extent);
      }
    } else {
      if (zoom) {
        this.map.zoomToFeature(feature);
      } else {
        this.map.moveToFeature(feature);
      }
    }
  }
}
