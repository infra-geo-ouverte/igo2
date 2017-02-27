export interface DataURL {
  Format: string;
  OnlineResource: string;
}

export interface LayerOptions extends olx.layer.BaseOptions {
  name: string;
  type: string;
  optionsFromCapabilities?: boolean;
  title?: string;
  dataURL?: DataURL[];
}

export abstract class Layer {

  olLayer: ol.layer.Layer;
  name: string;
  type: string;

  abstract createOlLayer(options: LayerOptions, capabilities?: ol.format.XML): ol.layer.Layer;

  constructor(options: LayerOptions, capabilities?: ol.format.XML) {
    this.name = options.name;
    this.type = options.type;
    this.olLayer = this.createOlLayer(options, capabilities);
  }

  getSource() {
    return this.olLayer.getSource();
  }
}
