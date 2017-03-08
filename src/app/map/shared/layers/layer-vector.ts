import { Layer, LayerOptions } from './layer';

export interface VectorLayerOptions extends LayerOptions {
  source?: olx.source.VectorOptions;
  view?: olx.layer.VectorOptions;
  style?: olx.style.StyleOptions;
}

export class VectorLayer extends Layer {

  options: VectorLayerOptions;
  protected olLayer: ol.layer.Vector;

  protected createOlLayer(): ol.layer.Vector {
    const olLayerOptions = Object.assign(this.options.view || {}, {
      style: new ol.style.Style(this.options.style),
      source: new ol.source.Vector(this.options.source)
    });

    return new ol.layer.Vector(olLayerOptions);
  }
}
