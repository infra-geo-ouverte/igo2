import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';

import { PanelComponent } from '@igo2/common/panel';

import { showContent } from './toast-panel-for-expansion.animations';

@Component({
  selector: 'app-toast-panel-for-expansion',
  templateUrl: './toast-panel-for-expansion.component.html',
  styleUrls: ['./toast-panel-for-expansion.component.scss'],
  animations: [showContent()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PanelComponent]
})
export class ToastPanelForExpansionComponent {
  @Input()
  set opened(value: boolean) {
    if (value === this._opened) {
      return;
    }
    this._opened = value;
    this.openedChange.emit(this._opened);
  }
  get opened(): boolean {
    return this._opened;
  }
  private _opened: boolean;

  @Input() title: string;

  @Input() withHeader: boolean;

  @Output() openedChange = new EventEmitter<boolean>();

  @HostBinding('class.toast-panel-for-expansion-opened')
  get hasOpenedClass() {
    return this.opened;
  }

  @HostBinding('style.visibility')
  get displayStyle() {
    return this.withHeader || this.opened ? 'visible' : 'hidden';
  }

  constructor() {}
}
