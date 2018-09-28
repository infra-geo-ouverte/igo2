import { Component, Input } from '@angular/core';

import { Media } from '@igo2/core';
import { Tool } from '@igo2/context';


@Component({
  selector: 'fadq-bottom-toolbar',
  templateUrl: './bottom-toolbar.component.html',
  styleUrls: ['./bottom-toolbar.component.scss']
})
export class BottomToolbarComponent {

  public tools: Tool[] = [
    {'name': 'zoomIn', 'icon': 'zoom_in'},
    {'name': 'zoomOut', 'icon': 'zoom_out'},
    {'name': 'previousView', 'icon': 'arrow_back'},
    {'name': 'nextView', 'icon': 'arrow_forward'},
    {'name': 'selectMapPointer', 'icon': 'mouse'},
    {'name': 'geolocate', 'icon': 'my_location'},
    {'name': 'streetview', 'icon': 'streetview'}
  ];

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
