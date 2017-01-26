import { MapOptions } from './map.interface';
import { LayerOptions } from './layers/layer.interface';
import { Layer } from './layers/layer.model';

// The name is NgMap because Map exists already
export class NgMap {
  olMap: ol.Map;
  layers: Layer[];

  constructor(options: MapOptions) {
    this.layers = [];

    this.olMap = new ol.Map({
      view: new ol.View(options.view)
    });
  }

  addLayer(layer: Layer) {
    this.layers.push(layer);
    this.olMap.addLayer(layer.olLayer);
  }
}
