import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

import { Widget } from '../shared/widget.interfaces';

@Component({
  selector: 'fadq-widget-outlet',
  templateUrl: './widget-outlet.component.html',
  styleUrls: ['./widget-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetOutletComponent implements OnDestroy {

  @Input()
  get widget(): Widget { return this._widget; }
  set widget(value: Widget) {
    this._widget = value;
  }
  private _widget: Widget;

  @Input()
  get inputs(): {[key: string]: any} { return this._inputs; }
  set inputs(value: {[key: string]: any}) { this._inputs = value; }
  private _inputs: {[key: string]: any};

  readonly subscribers = {
    cancel: (event) => this.onCancel(),
    complete: (event) => this.onComplete()
  };

  @Output() complete = new EventEmitter<Widget>();
  @Output() cancel = new EventEmitter<Widget>();

  constructor() {}

  ngOnDestroy() {
    this.destroyWidget();
  }

  private onCancel() {
    this.cancel.emit(this.widget);
    this.destroyWidget();
  }

  private onComplete() {
    this.complete.emit(this.widget);
    this.destroyWidget();
  }

  private destroyWidget() {
    if (this.widget !== undefined) {
      this.widget.destroy();
    }
    this.widget = undefined;
  }
}
