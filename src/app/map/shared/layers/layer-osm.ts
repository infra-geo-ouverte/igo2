import { Layer } from './layer';
import { OSMLayerOptions } from './layer-osm.interface';

export class OSMLayer extends Layer {

  public options: OSMLayerOptions;
  public olLayer: ol.layer.Tile;

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
