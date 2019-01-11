import {
  Component,
  Input,
  HostBinding,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import { EntityStore, EntityStoreController } from 'src/lib/entity';
import { Action } from '../shared/action.interfaces';

/**
 * Actionbar modes
 */
export enum ActionbarMode {
  Dock = 'dock',
  Overlay = 'overlay'
}

/**
 * A list of action buttons.
 * This component can be displayed in one of two way: 'dock' or 'overlay'
 */
@Component({
  selector: 'fadq-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionbarComponent implements OnChanges, OnDestroy {

  /**
   * Reference to the ActionbarMode enum for use in the template
   * @internal
   */
  actionbarMode = ActionbarMode;

  /**
   * Whether the actionbar is collapsed (Dock mode)
   * @internal
   */
  collapsed = false;

  /**
   * Toggle collapse action (Dock)
   * @internal
   */
  toggleCollapseAction = {
    id: 'actionbar_toggle',
    icon: 'more_vert',
    handler: () => { this.collapsed = !this.collapsed; }
  };

  /**
   * Action store controller
   * @internal
   */
  private controller: EntityStoreController;

  /**
   * Action store
   */
  @Input() store: EntityStore<Action>;

  /**
   * Actionbar mode
   */
  @Input() mode: ActionbarMode;

  /**
   * Whether a toggle button should be displayed (Dock mode)
   */
  @Input() withToggleButton: boolean = false;

  /**
   * Whether a the actionbar should display buttons horizontally
   */
  @Input() horizontal: boolean = false;

  /**
   * Whether action titles are displayed
   */
  @Input() withTitle: boolean = true;

  /**
   * Whether action icons are displayed
   */
  @Input() withIcon: boolean = true;

  /**
   * Overlay X position
   */
  @Input() xPosition: string = 'before';

  /**
   * Overlay X position
   */
  @Input() yPosition: string = 'above';

  /**
   * Class to add to the actionbar overlay
   */
  @Input()
  set overlayClass(value: string) { this._overlayClass = value; }
  get overlayClass(): string {
    return [this._overlayClass, 'fadq-actionbar-overlay'].join(' ');
  }
  private _overlayClass = '';

  /**
   * @ignore
   */
  @HostBinding('class.with-title')
  get withTitleClass() { return this.withTitle; }

  /**
   * @ignore
   */
  @HostBinding('class.with-icon')
  get withIconClass() { return this.withIcon; }

  /**
   * @ignore
   */
  @HostBinding('class.horizontal')
  get horizontalClass() { return this.horizontal; }

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  /**
   * @internal
   */
  ngOnChanges(changes: SimpleChanges) {
    const store = changes.store;
    if (store && store.currentValue !== store.previousValue) {
      this.controller.bindStore(this.store);
    }
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    this.controller.unbindStore();
  }

  /**
   * @internal
   */
  actionIsDisabled(action: Action): boolean {
    return this.store.getEntityState(action).disabled === true;
  }

  /**
   * Invoke the action handler
   * @internal
   */
  onTriggerAction(action: Action) {
    action.handler();
  }
}
