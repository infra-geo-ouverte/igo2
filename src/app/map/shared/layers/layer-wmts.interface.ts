import { LayerOptions} from './layer.interface';

export interface WMTSLayerOptions extends LayerOptions {
  source: olx.source.WMTSOptions;
  view?: olx.layer.TileOptions;
  optionsFromCapabilities?: boolean;
}
