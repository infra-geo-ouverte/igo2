import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Media } from '@igo2/core';
import { FlexibleState } from '@igo2/common';
import { Tool, ToolService } from '@igo2/context';

@Component({
  selector: 'fadq-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input()
  get opened(): boolean {
    return this._opened;
  }
  set opened(value: boolean) {
    if (value === this._opened) {
      return;
    }

    this._opened = value;
    this.openedChange.emit(this._opened);
  }
  private _opened: boolean;

  @Input()
  get tool(): Tool {
    return this._tool;
  }
  set tool(value: Tool) {
    this._tool = value;
  }
  private _tool: Tool;

  @Input()
  get media(): Media {
    return this._media;
  }
  set media(value: Media) {
    this._media = value;
  }
  private _media: Media;

  @Output() openedChange= new EventEmitter<boolean>();

  public topPanelState: FlexibleState = 'initial';

  constructor(public toolService: ToolService) {}

}
