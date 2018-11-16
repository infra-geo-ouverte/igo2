import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ChangeDetectionStrategy
} from '@angular/core';

import { Tool } from '@igo2/context';

@Component({
  selector: 'fadq-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {

  @Input()
  get tools(): Tool[] {
    return this._tools;
  }
  set tools(value: Tool[]) {
    this._tools = value;
  }
  private _tools: Tool[] = [];

  @Input()
  get active(): Tool {
    return this._active;
  }
  set active(value: Tool) {
    this._active = value;
  }
  private _active: Tool;

  @Input()
  get horizontal(): boolean {
    return this._horizontal;
  }
  set horizontal(value: boolean) {
    this._horizontal = value;
  }
  private _horizontal = false;

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

  @Output() activate = new EventEmitter<Tool>();

  @HostBinding('class.with-title')
  get withTitleClass() {
    return this.withTitle;
  }

  @HostBinding('class.with-icon')
  get withIconClass() {
    return this.withIcon;
  }

  @HostBinding('class.horizontal')
  get horizontalClass() {
    return this.horizontal;
  }

  constructor() {}

  getToolClass(tool: Tool): { [key: string]: boolean; } {
    const active = this.active !== undefined && this.active.name === tool.name;
    return {
      'fadq-toolbar-item-active': active
    }
  }
}
