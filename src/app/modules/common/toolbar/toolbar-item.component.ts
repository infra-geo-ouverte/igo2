import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Tool } from '@igo2/context';

@Component({
  selector: 'fadq-toolbar-item',
  templateUrl: './toolbar-item.component.html'
})
export class ToolbarItemComponent {

  @Input()
  get tool(): Tool {
    return this._tool;
  }
  set tool(value: Tool) {
    this._tool = value;
  }
  private _tool: Tool;

  @Input()
  get withTitle() {
    return this._withTitle;
  }
  set withTitle(value: boolean) {
    this._withTitle = value;
  }
  private _withTitle = true;

  @Input()
  get withIcon() {
    return this._withIcon;
  }
  set withIcon(value: boolean) {
    this._withIcon = value;
  }
  private _withIcon = true;

  @Output() activate: EventEmitter<Tool> = new EventEmitter();

  constructor() {}
}
