import { Layer, LayerOptions } from './layer';

export interface XYZLayerOptions extends LayerOptions {
  source?: olx.source.XYZOptions;
  view?: olx.layer.TileOptions;
}

export class XYZLayer extends Layer {

  olLayer: ol.layer.Tile;

  createOlLayer(options: XYZLayerOptions): ol.layer.Tile {
    const olLayerOptions = Object.assign(options.view || {}, {
      source: new ol.source.XYZ(options.source)
    });

    return new ol.layer.Tile(olLayerOptions);
  }

  constructor(options: XYZLayerOptions) {
    super(options);
  }
}
