import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ChangeDetectionStrategy
} from '@angular/core';

import { showContent } from './expansion-panel.animations';

@Component({
  selector: 'fadq-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  animations: [showContent()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpansionPanelComponent {

  @Input()
  set expanded(value: boolean) {
    if (value === this._expanded) {
      return;
    }
    this._expanded = value;
    this.expandedChange.emit(this._expanded);
  }
  get expanded(): boolean {
    return this._expanded;
  }
  private _expanded: boolean;

  @Input() backdropShown: boolean;

  @Output() expandedChange = new EventEmitter<boolean>();

  @HostBinding('class.fadq-expansion-panel-expanded')
  get hasExpandedClass() {
    return this.expanded;
  }

  constructor() {}

  onBackdropClick() {
    this.expanded = false;
    this.backdropShown = false;
  }

}
