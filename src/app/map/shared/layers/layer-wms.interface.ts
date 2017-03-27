import { QueryFormat } from '../query.service';

import { LayerOptions } from './layer.interface';

export interface WMSLayerOptions extends LayerOptions {
  source: olx.source.ImageWMSOptions;
  view?: olx.layer.TileOptions;
  dataUrl?: DataUrl;
  optionsFromCapabilities?: boolean;
  queryFormat?: QueryFormat;
  queryTitle?: string;
}

export interface DataUrl {
  format: string;
  onlineResource: string;
}
