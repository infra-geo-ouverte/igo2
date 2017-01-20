import { Layer, LayerOptions } from './layer.model';

export interface OSMLayerOptions extends LayerOptions {
  source?: olx.source.OSMOptions;
  view?: olx.layer.TileOptions;
}

export class OSMLayer extends Layer {

  olLayer: ol.layer.Tile;

  createOlLayer(options: OSMLayerOptions): ol.layer.Tile {
    let olLayerOptions = Object.assign(options.view || {}, {
      source: new ol.source.OSM(options.source)
    });

    return new ol.layer.Tile(olLayerOptions);
  }

  constructor(options: OSMLayerOptions) {
    super(options);
  }
}
