import { LayerOptions } from './layer.interface';

export interface OSMLayerOptions extends LayerOptions {
  source?: olx.source.OSMOptions;
  view?: olx.layer.TileOptions;
}
