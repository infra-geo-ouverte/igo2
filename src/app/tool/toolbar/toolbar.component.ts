import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Tool } from '../shared/tool.interface';

import { AppStore } from '../../app.store';

@Component({
  selector: 'igo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.styl']
})
export class ToolbarComponent implements OnInit {

  tools: Tool[];

  constructor(private store: Store<AppStore>) {}

  ngOnInit() {
    this.store
      .select(s => s.availableTools)
      .subscribe((tools: Tool[]) => {
          this.tools = tools;
       });
  }

  track(tool) {
    return tool.name;
  }

  selectTool(tool: Tool) {
    this.store.dispatch({type: 'SELECT_TOOL', payload: tool});
  }
}
