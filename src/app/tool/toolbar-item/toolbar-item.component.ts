import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Tool } from '../shared/tool.interface';

@Component({
  selector: 'igo-toolbar-item',
  templateUrl: './toolbar-item.component.html',
  styleUrls: ['./toolbar-item.component.styl']
})
export class ToolbarItemComponent {

  @Input() tool: Tool;
  @Output() toolSelected: EventEmitter<Tool> = new EventEmitter();

  constructor() { }

}
