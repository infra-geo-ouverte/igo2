import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  model
} from '@angular/core';

import { ExpansionPanelButtonComponent } from './expansion-panel-button/expansion-panel-button.component';

@Component({
  selector: 'app-expansion-panel-header',
  templateUrl: './expansion-panel-header.component.html',
  styleUrls: ['./expansion-panel-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExpansionPanelButtonComponent]
})
export class ExpansionPanelHeaderComponent {
  readonly expanded = model<boolean>(undefined);

  @HostBinding('class.app-expansion-panel-header-expanded')
  get hasExpandedClass() {
    return this.expanded();
  }

  handleClose(): void {
    this.expanded.set(false);
  }
}
