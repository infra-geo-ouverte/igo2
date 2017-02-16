export interface LayerOptions {
  name: string;
  type: string;
  optionsFromCapabilities?: boolean;
}

export abstract class Layer {

  olLayer: ol.layer.Layer;
  name: string;
  type: string;

  abstract createOlLayer(options: LayerOptions, getCapabilities?: ol.format.XML): ol.layer.Layer;

  constructor(options: LayerOptions, getCapabilities?: ol.format.XML) {
    this.name = options.name;
    this.type = options.type;
    this.olLayer = this.createOlLayer(options, getCapabilities);
  }

  getSource() {
    return this.olLayer.getSource();
  }
}
