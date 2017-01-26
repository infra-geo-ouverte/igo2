import { LayerOptions } from './layer.interface';

export interface TileLayerOptions extends LayerOptions {
  source?: olx.source.TileImageOptions;
  view?: olx.layer.TileOptions;
}
