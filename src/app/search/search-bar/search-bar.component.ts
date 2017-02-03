import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { Tool } from '../../tool/shared/tool.interface';

import { AppStore } from '../../app.store';

@Component({
  selector: 'igo-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.styl']
})
export class SearchBarComponent {
  @Input('tool') tool: Tool;
  @Output('key') key = new EventEmitter<string>();

  value: string;

  constructor(private store: Store<AppStore>) {}

  onKey(event: KeyboardEvent) {
    this.value = (<HTMLInputElement>event.target).value;
    this.key.emit(this.value);

    this.selectSearchTool();
  }

  selectSearchTool() {
    this.store.dispatch({type: 'SELECT_TOOL', payload: this.tool});
  }

}
