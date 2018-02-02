import { Component, Input } from '@angular/core';

import { Media, Feature, Tool, ToolService } from '@igo2/igo2';

import { FlexibleState } from '../../../shared';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.styl']
})
export class SidenavComponent {

  @Input()
  get opened(): boolean { return this._opened; }
  set opened(value: boolean) {
    this._opened = value;
  }
  private _opened: boolean;

  @Input()
  get feature(): Feature { return this._feature; }
  set feature(value: Feature) {
    this._feature = value;
  }
  private _feature: Feature;

  @Input()
  get tool(): Tool { return this._tool; }
  set tool(value: Tool) {
    this._tool = value;
  }
  private _tool: Tool;

  @Input()
  get media(): Media { return this._media; }
  set media(value: Media) {
    this._media = value;
  }
  private _media: Media;

  public topPanelState: FlexibleState = 'initial';

  constructor(public toolService: ToolService) { }

  toggleTopPanel() {
    if (this.topPanelState === 'initial') {
      this.topPanelState = 'expanded';
    } else {
      this.topPanelState = 'initial';
    }
  }

}
