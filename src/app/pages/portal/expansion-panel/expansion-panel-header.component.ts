import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';
import { ExpansionPanelButtonComponent } from './expansion-panel-button/expansion-panel-button.component';

@Component({
    selector: 'app-expansion-panel-header',
    templateUrl: './expansion-panel-header.component.html',
    styleUrls: ['./expansion-panel-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ExpansionPanelButtonComponent]
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
