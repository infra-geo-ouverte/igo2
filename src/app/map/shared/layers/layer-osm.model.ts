import { Layer } from './layer.model';
import { OSMLayerOptions } from './layer-osm.interface';

export class OSMLayer extends Layer {

  olLayer: ol.layer.Tile;

  createOlLayer(options: OSMLayerOptions): ol.layer.Tile {
    const olLayerOptions = Object.assign(options.view || {}, {
      source: new ol.source.OSM(options.source)
    });

    return new ol.layer.Tile(olLayerOptions);
  }

  constructor(options: OSMLayerOptions) {
    super(options);
  }
}
