import { MapOptions } from '../../map/shared/map';
import { LayerOptions } from '../../map/shared/layers';
import { Tool } from '../../tool/shared/tool.interface';

export interface Context {
  title: string;
  uri: string;
  scope?: 'public' | 'protected' | 'private';
  description?: string;
  icon?: string;
}

export interface DetailedContext extends Context {
  map: MapOptions;
  layers: LayerOptions[];
  tools: Tool[];
  toolbar: string[];
}
