import { AnyLayerOptions } from '@igo2/geo';

export interface LayerInfo {
  properties: { [key: string]: any };
  options: AnyLayerOptions;
}

export interface LayerGroup {
  title: string;
  layers: LayerInfo[];
}
