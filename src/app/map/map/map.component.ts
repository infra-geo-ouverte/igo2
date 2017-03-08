import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { SearchResult } from '../../search/shared/search-result.interface';
import { SearchResultType } from '../../search/shared/search-result.enum';

import { IgoMap } from '../shared/map';
import { MapService } from '../shared/map.service';
import { LayerService } from '../shared/layer.service';
import { LayerOptions } from '../shared/layers/layer';
import { WMSLayerOptions } from '../shared/layers/layer-wms';
import { MapOptions } from '../shared/map';


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
              private layerService: LayerService) { }

  ngOnInit() {
    this.map = this.mapService.getMap();

    this.store
      .select(s => s.map)
      .filter(s => s !== null)
      .subscribe((mapOptions: MapOptions) => this.map.setView(mapOptions.view));

    this.store
      .select(s => s.layers)
      .subscribe((layerOptions: LayerOptions[]) => this.handleLayersChanged(layerOptions));

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
    const feature = format.readFeature(result);

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
    if (result.type === SearchResultType.Layer) {
      return false;
    }
    this.handleFeatureResult(result, false);
  }

  private handleSelectedResult(result: SearchResult) {
    if (result.type === SearchResultType.Layer) {
      this.handleLayerResult(result);
    } else {
      this.handleFeatureResult(result, true);
    }
  }

  private handleLayerResult(result: SearchResult) {
    const layerOptions: WMSLayerOptions = {
      source: {
        url: result.properties['url'],
        projection: this.map.getProjection(),
        params: {
          layers: result.properties['name'],
        }
      },
      type: 'wms',
      name: result.properties['title']
    };
    this.layerService.createLayer(layerOptions).subscribe(
      layer => this.map.addLayer(layer)
    );
  }

  private handleFeatureResult(result: SearchResult, zoom: boolean = false) {
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
