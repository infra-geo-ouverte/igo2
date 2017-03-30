import { QueryableLayerOptions, FilterableLayerOptions } from './layer.interface';

export interface WMSLayerOptions extends QueryableLayerOptions, FilterableLayerOptions {
  source: olx.source.ImageWMSOptions;
  view?: olx.layer.TileOptions;
  dataUrl?: DataUrl;
  optionsFromCapabilities?: boolean;
}

export interface DataUrl {
  format: string;
  onlineResource: string;
}
