import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';

import { Tool } from '@igo2/context';

import { MAP_DEFAULT_TOOLS} from '../../../modules/map/shared/map.enum';

@Component({
  selector: 'fadq-expansion-panel-header',
  templateUrl: './expansion-panel-header.component.html',
  styleUrls: ['./expansion-panel-header.component.scss']
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
  get tools(): Tool[] {
    return this._tools;
  }
  set tools(value: Tool[]) {
    this._tools = value;
  }
  private _tools: Tool[] = MAP_DEFAULT_TOOLS;

  get toolbarCollapsed(): boolean {
    return !this.expanded;
  }

  @Output() expandedChange = new EventEmitter<boolean>();

  @HostBinding('class.fadq-expansion-panel-header-expanded')
  get hasExpandedClass() {
    return this.expanded;
  }

  constructor() {}

}
