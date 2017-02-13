import { Injectable } from '@angular/core';

import { NgMap } from '../map/shared/map';


@Injectable()
export class MapService {

  private map: NgMap;

  constructor() { }

  getMap(): NgMap {
    if (!this.map) {
      this.map = new NgMap();
    }

    return this.map;
  }
}
