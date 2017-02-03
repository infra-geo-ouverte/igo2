import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { Tool } from '../shared/tool.interface';

import { AppStore } from '../../app.store';

@Component({
  selector: 'igo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.styl']
})
export class ToolbarComponent {

  @Input() tools: Tool[];
  @Output() toolSelected: EventEmitter<Tool> = new EventEmitter();

  constructor(private store: Store<AppStore>) {}

  track(tool) {
    return tool.name;
  }

  selectTool(tool: Tool) {
    this.store.dispatch({type: 'SELECT_TOOL', payload: tool});
  }
}
