import { Layer, LayerOptions } from './layer';

export interface VectorLayerOptions extends LayerOptions {
  source?: olx.source.VectorOptions;
  view?: olx.layer.VectorOptions;
  style?: olx.style.StyleOptions;
}

export class VectorLayer extends Layer {

  olLayer: ol.layer.Vector;

  createOlLayer(options: VectorLayerOptions): ol.layer.Vector {
    const olLayerOptions = Object.assign(options.view || {}, {
      style: new ol.style.Style(options.style),
      source: new ol.source.Vector(options.source)
    });

    return new ol.layer.Vector(olLayerOptions);
  }

  constructor(options: VectorLayerOptions) {
    super(options);
  }
}
