import { LayerOptions } from './layer.interface';

export interface XYZLayerOptions extends LayerOptions {
  source?: olx.source.XYZOptions;
  view?: olx.layer.TileOptions;
}
