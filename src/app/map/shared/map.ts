import { Layer } from './layers/layer';

// The name is NgMap because Map exists already
export class NgMap {
  olMap: ol.Map;
  layers: Layer[] = [];

  constructor() {
    this.olMap = new ol.Map({});
  }

  setView(view: olx.ViewOptions) {
    this.olMap.setView(new ol.View(view));
  }

  addLayer(layer: Layer) {
    this.layers.push(layer);
    this.olMap.addLayer(layer.olLayer);
  }
}
