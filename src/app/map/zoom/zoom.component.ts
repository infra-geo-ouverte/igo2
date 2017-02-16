import { Component, Input } from '@angular/core';

import { NgMap } from '../shared/map';

@Component({
  selector: 'igo-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.styl']
})
export class ZoomComponent {

  @Input('map') map: NgMap;

  constructor() { }

}
