import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

import { Widget } from '../shared/widget.interfaces';

/**
 * This component dynamically renders a widget. It also subscribes
 * to the widget's 'cancel' and 'complete' events and destroys it
 * when any of those event is emitted.
 */
@Component({
  selector: 'fadq-widget-outlet',
  templateUrl: './widget-outlet.component.html',
  styleUrls: ['./widget-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetOutletComponent implements OnDestroy {

  /**
   * Widget subscribers to 'cancel' and 'complete'
   * @internal
   */
  readonly subscribers = {
    cancel: (event) => this.onCancel(),
    complete: (event) => this.onComplete()
  };

  /**
   * Widget
   */
  @Input() widget: Widget;

  /**
   * Widget inputs
   */
  @Input() inputs: {[key: string]: any};

  /**
   * Event emitted when the widget emits 'complete'
   */
  @Output() complete = new EventEmitter<Widget>();

  /**
   * Event emitted when the widget emits 'cancel'
   */
  @Output() cancel = new EventEmitter<Widget>();

  constructor() {}

  /**
   * Destroy the current widget and all it's inner subscriptions
   * @internal
   */
  ngOnDestroy() {
    this.destroyWidget();
  }

  /**
   * When the widget emits 'cancel', propagate that event and destroy
   * the widget
   */
  private onCancel() {
    this.cancel.emit(this.widget);
    this.destroyWidget();
  }

  /**
   * When the widget emits 'complete', propagate that event and destroy
   * the widget
   */
  private onComplete() {
    this.complete.emit(this.widget);
    this.destroyWidget();
  }

  /**
   * Destroy the current widget
   */
  private destroyWidget() {
    if (this.widget !== undefined) {
      this.widget.destroy();
    }
    this.widget = undefined;
  }
}
