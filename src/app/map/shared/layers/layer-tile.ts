import { Layer, LayerOptions } from './layer';

export interface TileLayerOptions extends LayerOptions {
  source?: olx.source.TileImageOptions;
  view?: olx.layer.TileOptions;
}

export class TileLayer extends Layer {
  olLayer: ol.layer.Tile;

  createOlLayer(options: TileLayerOptions): ol.layer.Tile {
    const olLayerOptions = Object.assign(options.view || {}, {
      source: new ol.source.Tile(options.source)
    });

    return new ol.layer.Tile(olLayerOptions);
  }

  constructor(options: TileLayerOptions) {
    super(options);
  }
}
