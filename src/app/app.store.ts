import { Tool } from './tool/shared/tool.interface';
import { SearchResult } from './search/shared/search-result.interface';
import { Media } from './core/media.service';

export interface AppStore {
  browserMedia: Media;
  selectedTool: Tool;
  searchResults: any;
  selectedResult: SearchResult;
  focusedResult: SearchResult;
}
