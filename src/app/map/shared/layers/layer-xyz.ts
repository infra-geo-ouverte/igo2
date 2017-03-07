import { Layer, LayerOptions } from './layer';

export interface XYZLayerOptions extends LayerOptions {
  source?: olx.source.XYZOptions;
  view?: olx.layer.TileOptions;
}

export class XYZLayer extends Layer {

  options: XYZLayerOptions;
  protected olLayer: ol.layer.Tile;

  protected createOlLayer(): ol.layer.Tile {
    const olLayerOptions = Object.assign(this.options.view || {}, {
      source: new ol.source.XYZ(this.options.source)
    });

    return new ol.layer.Tile(olLayerOptions);
  }
}
