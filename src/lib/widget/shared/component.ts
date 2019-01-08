
import { EventEmitter, Output } from '@angular/core';

export class WidgetComponent {

  @Output() complete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

}
