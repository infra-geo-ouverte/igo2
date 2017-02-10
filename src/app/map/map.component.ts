import { Component, OnInit, Input, HostBinding, AfterViewInit } from '@angular/core';

import { NgMap } from './shared/map';

let nextId = 0;

@Component({
  selector: 'igo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.styl']
})
export class MapComponent implements AfterViewInit {

  @Input() map: NgMap;

  id = `igo-map-${nextId++}`;

  constructor() {}

  ngAfterViewInit(): any {
    this.map.olMap.setTarget(this.id);
  }
}
