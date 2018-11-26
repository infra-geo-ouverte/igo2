import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { getEntityTitle, getEntityIcon } from '../../entity/shared/entity.utils';
import { Widget } from '../shared/widget.interface';

@Component({
  selector: 'fadq-widgetbar-item',
  templateUrl: './widgetbar-item.component.html',
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

  @Output() activated: EventEmitter<Widget> = new EventEmitter();

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
    this.activated.emit(this.widget);
  }
}
