import { Component, Input } from '@angular/core';

import { Media } from '@igo2/core';
import { Tool } from '@igo2/context';

@Component({
  selector: 'fadq-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
  host: {
    '[class.fadq-bottom-panel-opened]': 'opened'
  }
})
export class BottomPanelComponent {

  public bottomTools: Tool[] = [
    {"name": "parcels", "title": "Parcelles"}
  ];

  @Input()
  get opened(): boolean {
    return this._opened;
  }
  set opened(value: boolean) {
    this._opened = value;
  }
  private _opened: boolean;

  @Input()
  get media(): Media {
    return this._media;
  }
  set media(value: Media) {
    this._media = value;
  }
  private _media: Media;

  constructor() {}

}
