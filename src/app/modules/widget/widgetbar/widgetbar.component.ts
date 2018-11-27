import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import { EntityStore } from '../../entity/shared/store';
import { EntityStoreController } from '../../entity/shared/controller';
import { Widget } from '../shared/widget.interface';

// TODO: I'm not sure using a igo-list is the right thing to do
// It has built-in select and focu mechanism that we might not need
// and that we actually need to override. For example, we need
// to remove th background color with some css and we lose
// the focus/ripple effect when hovering/clicking a selected widget

const TOGGLE_WIDGET = {
  id: 'widgetbar_toggle',
  icon: 'more_vert'
};

@Component({
  selector: 'fadq-widgetbar',
  templateUrl: './widgetbar.component.html',
  styleUrls: ['./widgetbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetbarComponent implements OnChanges, OnDestroy {

  public visible = true;

  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<Widget> {
    return this._store;
  }
  set store(value: EntityStore<Widget>) {
    this._store = value;
  }
  private _store;

  @Input()
  get collapsed() {
    return this._collapsed;
  }
  set collapsed(value: boolean) {
    this._collapsed = value;
  }
  private _collapsed = true;

  @Input()
  get withToggleButton(): boolean {
    return this._withToggleButton;
  }
  set withToggleButton(value: boolean) {
    this._withToggleButton = value;
  }
  private _withToggleButton = false;

  @Input()
  get horizontal(): boolean {
    return this._horizontal;
  }
  set horizontal(value: boolean) {
    this._horizontal = value;
  }
  private _horizontal = false;

  @Input()
  get withTitle(): boolean {
    return this._withTitle;
  }
  set withTitle(value: boolean) {
    this._withTitle = value;
  }
  private _withTitle = true;

  @Input()
  get withIcon(): boolean {
    return this._withIcon;
  }
  set withIcon(value: boolean) {
    this._withIcon = value;
  }
  private _withIcon = true;

  @Input()
  get xPosition(): string {
    return this._xPosition;
  }
  set xPosition(value: string) {
    this._xPosition = value;
  }
  private _xPosition = 'before';

  @Input()
  get yPosition(): string {
    return this._yPosition;
  }
  set yPosition(value: string) {
    this._yPosition = value;
  }
  private _yPosition = 'above';

  @Input()
  get overlayClass(): string {
    return [this._overlayClass, 'fadq-widgetbar-overlay'].join(' ');
  }
  set overlayClass(value: string) {
    this._overlayClass = value;
  }
  private _overlayClass = '';

  @Output() activateWidget = new EventEmitter<Widget>();

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

  get toggleWidget(): Widget {
    return TOGGLE_WIDGET;
  }

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

  getWidgetClass(widget: Widget): { [key: string]: boolean; } {
    const state = this.store.getEntityState(widget);
    return {
      'fadq-widgetbar-item-active': state.active
    };
  }

  onActivateWidget(widget: Widget) {
    this.controller.updateEntityState(widget, {active: true}, true);
    this.activateWidget.emit(widget);
  }

  onToggle() {
    this.visible = !this.visible;
  }
}
