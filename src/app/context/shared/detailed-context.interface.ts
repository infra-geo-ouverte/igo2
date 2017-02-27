import { Context } from './context.interface';
import { MapOptions } from '../../map/shared/map';
import { LayerOptions } from '../../map/shared/layers/layer';
import { Tool } from '../../tool/shared/tool.interface';

export interface DetailedContext extends Context {
  map: MapOptions;
  layers: LayerOptions[];
  tools: Tool[];
}
