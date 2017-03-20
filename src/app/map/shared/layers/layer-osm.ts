import { Layer, LayerOptions } from './layer';

export interface OSMLayerOptions extends LayerOptions {
  source?: olx.source.OSMOptions;
  view?: olx.layer.TileOptions;
}

export class OSMLayer extends Layer {

  public options: OSMLayerOptions;

  protected olLayer: ol.layer.Tile;

  protected createOlLayer(): ol.layer.Tile {
    const olLayerOptions = Object.assign(this.options.view || {}, {
      source: new ol.source.OSM(this.options.source)
    });

    return new ol.layer.Tile(olLayerOptions);
  }

  protected createId() {
    return 'OSM';
  }
}
