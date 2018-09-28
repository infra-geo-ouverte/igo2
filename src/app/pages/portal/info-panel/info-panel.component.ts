import { Component, Input } from '@angular/core';

import { Feature } from '@igo2/geo';


@Component({
  selector: 'fadq-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss'],
  host: {
    '[class.fadq-info-panel-opened]': 'opened'
  }
})
export class InfoPanelComponent {

  @Input()
  get opened(): boolean {
    return this._opened;
  }
  set opened(value: boolean) {
    this._opened = value;
  }
  private _opened: boolean;

  @Input()
  get feature(): Feature {
    return this._feature;
  }
  set feature(value: Feature) {
    this._feature = value;
  }
  private _feature: Feature;

  constructor() {}

}
