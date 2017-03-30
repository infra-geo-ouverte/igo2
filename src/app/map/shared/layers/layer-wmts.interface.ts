import { LayerOptions, FilterableLayerOptions } from './layer.interface';

export interface WMTSLayerOptions extends LayerOptions, FilterableLayerOptions {
  source: olx.source.WMTSOptions;
  view?: olx.layer.TileOptions;
  optionsFromCapabilities?: boolean;
}
