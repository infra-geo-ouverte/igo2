
import { EventEmitter, Output } from '@angular/core';

/**
 * This is a base class for widget components. A widget
 * component is component that can be created dynamically. It needs
 * to emit the 'complte' and 'cancel' event at some time in it's lifecycle.
 * @todo Maybe this should be an abstract method that components implement
 *  instead of extendig.
 */
export class WidgetComponent {

  /**
   * Event emitted with a widget completes it's task
   */
  @Output() complete = new EventEmitter<void>();

  /**
   * Event emitted with a widget's task is cancelled
   */
  @Output() cancel = new EventEmitter<void>();

}
