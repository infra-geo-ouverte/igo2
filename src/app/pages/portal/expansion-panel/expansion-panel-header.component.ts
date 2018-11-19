import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';

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

  @Output() expandedChange = new EventEmitter<boolean>();

  @HostBinding('class.fadq-expansion-panel-header-expanded')
  get hasExpandedClass() {
    return this.expanded;
  }

  constructor() {}

}
