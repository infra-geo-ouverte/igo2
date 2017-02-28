import { Context } from '../context/shared/context.interface';
import { Tool } from '../tool/shared/tool.interface';
import { SearchResult } from '../search/shared/search-result.interface';
import { LayerOptions } from '../map/shared/layers/layer';
import { MapViewOptions } from '../map/shared/map';

export interface IgoStore {
  activeContext: Context;
  contexts: Context[];
  selectedTool: Tool;
  mapView: MapViewOptions;
  mapLayers: Array<LayerOptions>;
  searchResults: any;
  selectedResult: SearchResult;
  focusedResult: SearchResult;
  tools: Tool[];
}
