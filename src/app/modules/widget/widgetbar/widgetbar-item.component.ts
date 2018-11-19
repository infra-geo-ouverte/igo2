import { Component, Input, Output, EventEmitter } from '@angular/core';

import { getEntityTitle, getEntityIcon } from '../../entity/shared/entity.utils';
import { Entity } from '../../entity/shared/entity.interface';
import { Widget } from '../shared/widget.interface';

@Component({
  selector: 'fadq-widgetbar-item',
  templateUrl: './widgetbar-item.component.html'
})
export class WidgetbarItemComponent {

  @Input()
  get widget(): Entity<Widget> {
    return this._widget;
  }
  set widget(value: Entity<Widget>) {
    this._widget = value;
  }
  private _widget: Entity<Widget>;

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

  @Output() activate: EventEmitter<Widget> = new EventEmitter();

  get title(): string {
    return getEntityTitle(this.widget);
  }

  get tooltip(): string {
    return this.widget.data.tooltip || this.title;
  }

  get icon(): string {
    return getEntityIcon(this.widget);
  }

  get image(): string {
    return this.widget.data.iconImage;
  }

  constructor() {}
}
