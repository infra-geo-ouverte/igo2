import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { Tool } from '../shared/tool.interface';

@Component({
  selector: 'igo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.styl']
})
export class ToolbarComponent implements OnInit {

  tools: Tool[];

  constructor(private store: Store<IgoStore>) {}

  ngOnInit() {
    this.store
      .select(s => s.tools)
      .subscribe((tools: Tool[]) =>
        this.tools = tools.filter(tool => tool.toolbar === true));
  }

  track(tool) {
    return tool.name;
  }

  selectTool(tool: Tool) {
    this.store.dispatch({type: 'SELECT_TOOL', payload: tool});
  }
}
