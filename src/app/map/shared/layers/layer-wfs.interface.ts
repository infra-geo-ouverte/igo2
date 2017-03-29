import { LayerOptions} from './layer.interface';

export interface WFSLayerOptions extends LayerOptions {
  source?: IWFSLayerSource;
  view?: olx.layer.VectorOptions;
  style?: olx.style.StyleOptions;
}

export interface IWFSLayerSource extends olx.source.VectorOptions {
 format?: any;
}
