import { Tool } from './tool/shared/tool.interface';
import { SearchResult } from './search/shared/search-result.interface';
import { Media } from './core/media.service';
import { LayerOptions } from './map/shared/layers/layer';

export interface AppStore {
  browserMedia: Media;
  mapView: olx.ViewOptions;
  mapLayers: Array<LayerOptions>;
  selectedTool: Tool;
  searchResults: any;
  selectedResult: SearchResult;
  focusedResult: SearchResult;
  availableTools: Tool[];
}
