import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Feature } from '@igo2/geo';


@Component({
  selector: 'fadq-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss'],
  host: {
    '[class.fadq-info-panel-opened]': 'opened',
    '[class.fadq-info-panel-with-feature]': 'feature === undefined ? false : true'
  }
})
export class InfoPanelComponent {

  @Input()
  get opened(): boolean {
    return this._opened;
  }
  set opened(value: boolean) {
    if (value === this._opened) {
      return;
    }

    this._opened = value;
    this.openedChange.emit(this._opened);
  }
  private _opened: boolean;

  @Input()
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }
  private _title: string;

  @Input()
  get feature(): Feature {
    return this._feature;
  }
  set feature(value: Feature) {
    this._feature = value;
    if (this._feature !== undefined) {
      this.toggleDisplay();
    }
  }
  private _feature: Feature;

  @Output() openedChange = new EventEmitter<boolean>();

  constructor() {}

  private toggleDisplay() {
    (document.querySelector('fadq-info-panel') as HTMLElement).style.display = 'block';
  }

}
