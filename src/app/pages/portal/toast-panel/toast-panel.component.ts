import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild
} from '@angular/core';

import { showContent } from './toast-panel.animations';

@Component({
  selector: 'fadq-toast-panel',
  templateUrl: './toast-panel.component.html',
  styleUrls: ['./toast-panel.component.scss'],
  animations: [showContent()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastPanelComponent {

  @Input()
  set opened(value: boolean) {
    if (value === this._opened) {
      return;
    }
    this._opened = value;
    this.openedChange.emit(this._opened);
  }
  get opened(): boolean { return this._opened; }
  private _opened: boolean;

  @Input() title: string;

  @Input() withHeader: boolean;

  @Output() openedChange = new EventEmitter<boolean>();

  @HostBinding('class.fadq-toast-panel-opened')
  get hasOpenedClass() {
    return this.opened;
  }

  @HostBinding('style.visibility')
  get displayStyle() {
    return (this.withHeader || this.opened) ? 'visible' : 'hidden';
  }

  @ViewChild('content') content: ElementRef;

  get empty(): boolean {
    return this.content.nativeElement.children.length === 0;
  }

  constructor() {}

  onToggleClick() {
    this.opened = !this.opened;
  }
}
