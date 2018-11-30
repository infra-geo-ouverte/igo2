import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { getEntityTitle, getEntityIcon } from 'src/app/modules/entity';

import { Widget } from '../shared';

@Component({
  selector: 'fadq-widgetbar-item',
  templateUrl: './widgetbar-item.component.html',
  styleUrls: ['./widgetbar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetbarItemComponent {

  @Input()
  get widget(): Widget {
    return this._widget;
  }
  set widget(value: Widget) {
    this._widget = value;
  }
  private _widget: Widget;

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

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
  }
  private _disabled = false;

  @Output() activate: EventEmitter<Widget> = new EventEmitter();

  get title(): string {
    return getEntityTitle(this.widget);
  }

  get tooltip(): string {
    return this.widget.tooltip || this.title;
  }

  get icon(): string {
    return getEntityIcon(this.widget);
  }

  get image(): string {
    return this.widget.iconImage;
  }

  constructor() {}

  onClick() {
    if (this.disabled === true) {
      return;
    }
    this.activate.emit(this.widget);
  }
}
