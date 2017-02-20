import { Tool } from './tool/shared/tool.interface';
import { SearchResult } from './search/shared/search-result.interface';
import { LayerOptions } from './map/shared/layers/layer';
import { MapViewOptions } from './map/shared/map';

export interface AppStore {
  mapView: MapViewOptions;
  mapLayers: Array<LayerOptions>;
  selectedTool: Tool;
  searchResults: any;
  selectedResult: SearchResult;
  focusedResult: SearchResult;
  availableTools: Tool[];
}
