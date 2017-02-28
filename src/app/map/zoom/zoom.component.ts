import { Component, Input } from '@angular/core';

import { IgoMap } from '../shared/map';

@Component({
  selector: 'igo-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.styl']
})
export class ZoomComponent {

  @Input('map') map: IgoMap;

  constructor() { }

}
