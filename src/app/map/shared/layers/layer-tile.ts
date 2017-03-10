import { Layer, LayerOptions } from './layer';

export interface TileLayerOptions extends LayerOptions {
  source?: olx.source.TileImageOptions;
  view?: olx.layer.TileOptions;
}

export class TileLayer extends Layer {

  options: TileLayerOptions;
  protected olLayer: ol.layer.Tile;

  protected createOlLayer(): ol.layer.Tile {
    const olLayerOptions = Object.assign(this.options.view || {}, {
      source: new ol.source.Tile(this.options.source)
    });

    return new ol.layer.Tile(olLayerOptions);
  }
}
