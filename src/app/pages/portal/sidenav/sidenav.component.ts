import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() openedChange = new EventEmitter<boolean>();

  constructor(private toolService: ToolService) {}

  onPreviousButtonClicked() {
    this.toolService.selectPreviousTool();
  }

  onUnselectButtonClicked() {
    this.toolService.unselectTool();
  }

}
