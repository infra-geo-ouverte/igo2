import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DataSource } from './expansion-panel.component';

@Component({
  selector: 'fadq-expansion-panel-header',
  templateUrl: './expansion-panel-header.component.html',
  styleUrls: ['./expansion-panel-header.component.scss'],
  host: {
    '[class.fadq-expansion-panel-header-expanded]': 'expanded'
  }
})
export class ExpansionPanelHeaderComponent {

  @Input()
  get expanded(): boolean {
    return this._expanded;
  }
  set expanded(value: boolean) {
    if (value === this._expanded) {
        return;
      }
  
      this._expanded = value;
      this.expandedChange.emit(this._expanded);
  }
  private _expanded: boolean;

  @Input()
  get dataSources(): DataSource[] {
    return this._dataSources;
  }
  set dataSources(value: DataSource[]) {
    this._dataSources = value;
  }
  private _dataSources: DataSource[];

  @Output() expandedChange = new EventEmitter<boolean>();

  constructor() {}

}
