import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Context } from '../shared/context.interface';

@Component({
  selector: 'igo-context-list-item',
  templateUrl: './context-list-item.component.html',
  styleUrls: ['./context-list-item.component.styl']
})
export class ContextListItemComponent {

  @Input() context: Context;
  @Input() edition: boolean = true;

  @Output() editContext: EventEmitter<Context> = new EventEmitter();

  handleEditButtonClick(event: MouseEvent) {
    event.stopPropagation();
    this.editContext.emit(this.context);
  }

  constructor() { }

}
