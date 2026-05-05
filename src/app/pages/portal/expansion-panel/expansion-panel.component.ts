import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  model
} from '@angular/core';

import { BackdropComponent } from '@igo2/common/backdrop';

import { ExpansionPanelHeaderComponent } from './expansion-panel-header.component';
import { showContent } from './expansion-panel.animations';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  animations: [showContent()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BackdropComponent, ExpansionPanelHeaderComponent]
})
export class ExpansionPanelComponent {
  readonly expanded = model(false);
  readonly maximized = input(false);
  readonly backdropShown = model(false);

  @HostBinding('class.app-expansion-panel-expanded')
  get hasExpandedClass() {
    return this.expanded();
  }

  @HostBinding('class.app-expansion-panel-expanded-maximized')
  get hasExpandedFullClass() {
    return this.expanded() && this.maximized();
  }

  onBackdropClick() {
    this.expanded.set(false);
    this.backdropShown.set(false);
  }
}
