import { EventEmitter } from '@angular/core';

import { DynamicComponent, OnUpdateInputs } from 'src/lib/common';

/**
 * This is the interface a widget component needs to implement. A widget
 * component is component that can be created dynamically. It needs
 * to emit the 'complete' and 'cancel' event at some time in it's lifecycle.
 * Since a widget's inputs are set manually, it should implement the 'onUpdateInputs'
 * method. This method could, for example, trigger the change detection.
 */
export interface WidgetComponent extends OnUpdateInputs {
  complete: EventEmitter<void>;
  cancel: EventEmitter<void>;
}

export type Widget = DynamicComponent<WidgetComponent>;
