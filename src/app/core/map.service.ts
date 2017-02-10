import { Injectable } from '@angular/core';

import { NgMap, MapOptions } from '../map/shared/map';


@Injectable()
export class MapService {

  private map: NgMap;

  constructor() { }

  createMap(options: MapOptions): NgMap {
    this.map = new NgMap(options);
    return this.map;
  }

  getMap(): NgMap {
    return this.map;
  }
}
