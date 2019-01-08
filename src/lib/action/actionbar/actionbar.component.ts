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

@Component({
  selector: 'fadq-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionbarComponent implements OnChanges, OnDestroy {

  public visible = true;

  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<Action> { return this._store; }
  set store(value: EntityStore<Action>) { this._store = value; }
  private _store;

  @Input()
  get collapsed() { return this._collapsed; }
  set collapsed(value: boolean) { this._collapsed = value; }
  private _collapsed = true;

  @Input()
  get withToggleButton(): boolean { return this._withToggleButton; }
  set withToggleButton(value: boolean) { this._withToggleButton = value; }
  private _withToggleButton = false;

  @Input()
  get horizontal(): boolean { return this._horizontal; }
  set horizontal(value: boolean) { this._horizontal = value; }
  private _horizontal = false;

  @Input()
  get withTitle(): boolean { return this._withTitle; }
  set withTitle(value: boolean) { this._withTitle = value; }
  private _withTitle = true;

  @Input()
  get withIcon(): boolean { return this._withIcon; }
  set withIcon(value: boolean) { this._withIcon = value; }
  private _withIcon = true;

  @Input()
  get xPosition(): string { return this._xPosition; }
  set xPosition(value: string) { this._xPosition = value; }
  private _xPosition = 'before';

  @Input()
  get yPosition(): string { return this._yPosition; }
  set yPosition(value: string) { this._yPosition = value; }
  private _yPosition = 'above';

  @Input()
  get overlayClass(): string {
    return [this._overlayClass, 'fadq-actionbar-overlay'].join(' ');
  }
  set overlayClass(value: string) { this._overlayClass = value; }
  private _overlayClass = '';

  @HostBinding('class.with-title')
  get withTitleClass() { return this.withTitle; }

  @HostBinding('class.with-icon')
  get withIconClass() { return this.withIcon; }

  @HostBinding('class.horizontal')
  get horizontalClass() { return this.horizontal; }

  readonly toggleAction = {
    id: 'actionbar_toggle',
    icon: 'more_vert',
    handler: () => { this.visible = !this.visible; }
  };

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnChanges(changes: SimpleChanges) {
    const store = changes.store;
    if (store && store.currentValue !== store.previousValue) {
      this.controller.bind(this.store);
    }
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  actionIsDisabled(action: Action): boolean {
    return this.store.getEntityState(action).disabled === true;
  }

  onTriggerAction(action: Action) {
    action.handler();
  }
}
