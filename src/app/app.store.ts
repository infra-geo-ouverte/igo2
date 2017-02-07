import { Tool } from './tool/shared/tool.interface';

export interface AppStore {
  selectedTool: Tool;
  searchResults: any;
}
