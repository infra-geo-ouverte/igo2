import { Context } from '../context/shared/context.interface';
import { Tool } from '../tool/shared/tool.interface';
import { SearchResult } from '../search/shared/search-result.interface';
import { LayerOptions } from '../map/shared/layers';
import { MapOptions } from '../map/shared/map';

export interface IgoStore {
  activeContext: Context;
  editedContext: Context;
  toolHistory: Tool[];
  map: MapOptions;
  layers: Array<LayerOptions>;
  tools: Tool[];
  searchResults: any;
  selectedResult: SearchResult;
  focusedResult: SearchResult;
}
