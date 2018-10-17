import { Component, Input } from '@angular/core';

import { IgoMap } from '@igo2/geo';
import { Tool } from '@igo2/context';
import { MapTool, MapDefaultTools } from '../shared/map-tool.enum';


@Component({
  selector: 'fadq-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.scss']
})
export class MapToolbarComponent {

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map: IgoMap;

  @Input()
  get tools(): Tool[] {
    return this._tools;
  }
  set tools(value: Tool[]) {
    this._tools = value;
  }
  private _tools: Tool[] = MapDefaultTools;

  constructor() {}

  activateTool(tool: Tool) {
    switch (tool.name) {
      case MapTool.ZoomIn: {
        this.map.zoomIn();
        break;
      }
      case MapTool.ZoomOut: {
        this.map.zoomOut();
        break;
      }
      default: {
        break;
      }
    }
  }



}
