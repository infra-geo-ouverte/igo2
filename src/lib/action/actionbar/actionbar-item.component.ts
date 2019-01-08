import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { getEntityTitle, getEntityIcon } from 'src/lib/entity';

import { Action } from '../shared/action.interfaces';

@Component({
  selector: 'fadq-actionbar-item',
  templateUrl: './actionbar-item.component.html',
  styleUrls: ['./actionbar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionbarItemComponent {

  @Input()
  get action(): Action { return this._action; }
  set action(value: Action) { this._action = value; }
  private _action: Action;

  @Input()
  get withTitle() { return this._withTitle; }
  set withTitle(value: boolean) { this._withTitle = value; }
  private _withTitle = true;

  @Input()
  get withIcon() { return this._withIcon; }
  set withIcon(value: boolean) { this._withIcon = value; }
  private _withIcon = true;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) { this._disabled = value; }
  private _disabled = false;

  @Output() trigger: EventEmitter<Action> = new EventEmitter();

  get title(): string {
    return getEntityTitle(this.action);
  }

  get tooltip(): string {
    return this.action.tooltip || this.title;
  }

  get icon(): string {
    return getEntityIcon(this.action);
  }

  constructor() {}

  onClick() {
    if (this.disabled === true) {
      return;
    }
    this.trigger.emit(this.action);
  }
}
