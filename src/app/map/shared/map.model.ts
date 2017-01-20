import { Layer, LayerOptions } from './layers/layer.model';

export interface MapOptions {
  view: olx.ViewOptions;
}

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
