import { Tool } from './tool/shared/tool.interface';
import { SearchResult } from './search/shared/search-result.interface';

export interface AppStore {
  selectedTool: Tool;
  searchResults: any;
  selectedResult: SearchResult;
}
