import { Component, Input } from '@angular/core';

import { Media, MediaOrientation, MediaService } from '@igo2/core';
import { Tool } from '@igo2/context';

import { MapTool, MAP_DEFAULT_TOOLS} from '../shared/map.enum';
import { IgoMap } from '../../map/shared/map';

@Component({
  selector: 'fadq-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.scss']
})
export class MapToolbarComponent {

  public visible = true;

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
  private _tools: Tool[] = MAP_DEFAULT_TOOLS;

  get collapsed(): boolean {
    // Make that work with OnPush strategy
    return (
      this.mediaService.media$.value !== Media.Desktop ||
      (
        this.mediaService.media$.value === Media.Desktop &&
        this.mediaService.orientation$.value === MediaOrientation.Portrait
      )
    );
  }

  constructor(public mediaService: MediaService) {}

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
