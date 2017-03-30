import { FilterableLayerOptions } from './layer.interface';

export interface WMTSLayerOptions extends FilterableLayerOptions {
  source: olx.source.WMTSOptions;
  view?: olx.layer.TileOptions;
  optionsFromCapabilities?: boolean;
}
