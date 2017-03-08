export interface DataURL {
  format: string;
  onlineResource: string;
}

export interface LayerOptions extends olx.layer.BaseOptions {
  name: string;
  type: string;
  optionsFromCapabilities?: boolean;
  title?: string;
  dataURL?: DataURL;
}

export abstract class Layer {

  options: LayerOptions;
  protected olLayer: ol.layer.Layer;

  constructor(options: LayerOptions) {
    this.options = options;
  }

  protected abstract createOlLayer(): ol.layer.Layer;

  getOlLayer() {
    if (this.olLayer === undefined) {
      this.olLayer = this.createOlLayer();
    }

    return this.olLayer;
  }

  getSource() {
    return this.getOlLayer().getSource();
  }
}
