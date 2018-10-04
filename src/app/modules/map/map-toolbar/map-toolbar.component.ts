import { Component, Input } from '@angular/core';

import { Media } from '@igo2/core';
import { Tool } from '@igo2/context';


@Component({
  selector: 'fadq-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.scss']
})
export class MapToolbarComponent {

  public tools: Tool[] = [
    {'name': 'baselayerSwitcher', 'icon': 'photo_library'},
    {'name': 'zoomIn', 'icon': 'zoom_in'},
    {'name': 'zoomOut', 'icon': 'zoom_out'},
    {'name': 'previousView', 'icon': 'arrow_back'},
    {'name': 'nextView', 'icon': 'arrow_forward'},
    {'name': 'mapPointer', 'icon': 'mouse'},
    {'name': 'geolocation', 'icon': 'my_location'},
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
