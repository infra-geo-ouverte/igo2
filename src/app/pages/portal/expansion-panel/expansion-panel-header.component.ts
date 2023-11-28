import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-expansion-panel-header',
  templateUrl: './expansion-panel-header.component.html',
  styleUrls: ['./expansion-panel-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpansionPanelHeaderComponent {
  @Input() expanded: boolean;

  @Output() expandedChange = new EventEmitter<boolean>();

  @HostBinding('class.app-expansion-panel-header-expanded')
  get hasExpandedClass() {
    return this.expanded;
  }

  constructor() {}

  handleClose(): void {
    this.expandedChange.emit(false);
  }
}
