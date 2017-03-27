import { LayerOptions } from './layer.interface';

export interface VectorLayerOptions extends LayerOptions {
  source?: olx.source.VectorOptions;
  view?: olx.layer.VectorOptions;
  style?: olx.style.StyleOptions;
}
