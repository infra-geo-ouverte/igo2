import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input
} from '@angular/core';

import { PanelComponent } from '@igo2/common/panel';

import { showContent } from './toast-panel-for-expansion.animations';

@Component({
  selector: 'app-toast-panel-for-expansion',
  templateUrl: './toast-panel-for-expansion.component.html',
  styleUrls: ['./toast-panel-for-expansion.component.scss'],
  animations: [showContent()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelComponent]
})
export class ToastPanelForExpansionComponent {
  readonly opened = input(false);
  readonly title = input<string>(undefined);

  readonly withHeader = input<boolean>(undefined);

  @HostBinding('class.toast-panel-for-expansion-opened')
  get hasOpenedClass() {
    return this.opened();
  }

  @HostBinding('style.visibility')
  get displayStyle() {
    return this.withHeader() || this.opened() ? 'visible' : 'hidden';
  }
}
