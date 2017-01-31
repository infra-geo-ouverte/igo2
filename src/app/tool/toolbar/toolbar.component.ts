import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { Tool } from '../shared/tool.interface';

@Component({
  selector: 'igo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.styl']
})
export class ToolbarComponent {

  @Input() tools: Tool[];
  @Output() toolSelected: EventEmitter<Tool> = new EventEmitter();

  constructor() { }

  track(tool) {
    return tool.name;
  }

}
