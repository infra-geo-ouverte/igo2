import { Component, Input } from '@angular/core';

import { Feature } from 'igo2';

import { FlexibleState } from '../../../shared';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.styl']
})
export class ToastComponent {

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

  public state: FlexibleState;

  constructor() { }

  toggle() {
    this.opened = !this.opened;
  }

}
