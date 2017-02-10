export interface LayerOptions {
  name: string;
  type: string;
}

export abstract class Layer {

  olLayer: ol.layer.Layer;
  name: string;
  type: string;

  abstract createOlLayer(options: LayerOptions): ol.layer.Layer;

  constructor(options: LayerOptions) {
    this.name = options.name;
    this.type = options.type;
    this.olLayer = this.createOlLayer(options);
  }
}
