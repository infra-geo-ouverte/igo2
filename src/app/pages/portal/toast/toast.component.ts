import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Feature } from 'igo2';

import { FlexibleState } from '../../../shared';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.styl']
})
export class ToastComponent {

  static SWIPE_ACTION = {
    UP: 'swipeup',
    DOWN: 'swipedown'
  };

  @Input()
  get opened(): boolean { return this._opened; }
  set opened(value: boolean) {
    this.state = value ? 'expanded' : 'collapsed';
    this._opened = value;
  }
  private _opened: boolean;

  @Input()
  get feature(): Feature { return this._feature; }
  set feature(value: Feature) {
    this._feature = value;
  }
  private _feature: Feature;

  @Output() onOpened = new EventEmitter<boolean>();

  public state: FlexibleState;

  constructor() { }

  toggle() {
    this.opened = !this.opened;
    this.onOpened.emit(this.opened);
  }

  swipe(action: string) {
    if (action === ToastComponent.SWIPE_ACTION.UP) {
      if (!this.opened) {
        this.toggle();
      }
    } else if (action === ToastComponent.SWIPE_ACTION.DOWN) {
      if (this.opened) {
        this.toggle();
      }
    }
  }

}
