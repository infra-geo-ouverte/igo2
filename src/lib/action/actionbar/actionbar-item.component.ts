import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { getEntityTitle, getEntityIcon } from 'src/lib/entity';

import { Action } from '../shared/action.interfaces';

 /**
  * An action button
  */
@Component({
  selector: 'fadq-actionbar-item',
  templateUrl: './actionbar-item.component.html',
  styleUrls: ['./actionbar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionbarItemComponent {

  /**
   * Action
   */
  @Input() action: Action;

  /**
   * Color
   */
  @Input() color: string = 'default';

  /**
   * Whether the action title is displayed
   */
  @Input() withTitle: boolean = true;

  /**
   * Whether the action icon is displayed
   */
  @Input() withIcon: boolean = true;

  /**
   * Whether the action is disabled
   */
  @Input() disabled: boolean = false;

  /**
   * Event emitted when the action button is clicked
   */
  @Output() trigger: EventEmitter<Action> = new EventEmitter();

  /**
   * @internal
   */
  get title(): string { return getEntityTitle(this.action); }

  /**
   * @internal
   */
  get tooltip(): string { return this.action.tooltip || this.title; }

  /**
   * @internal
   */
  get icon(): string { return getEntityIcon(this.action); }

  constructor() {}

  /**
   * When the action button is clicked, emit the 'trigger' event but don't
   * invoke the action handler. This is handled by the parent component.
   * @internal
   */
  onClick() {
    if (this.disabled === true) {
      return;
    }
    this.trigger.emit(this.action);
  }
}
