import { Injectable } from '@angular/core';

import { NgMap, MapOptions } from './map.model';


@Injectable()
export class MapService {

  constructor() { }

  createMap(options: MapOptions): NgMap {
    return new NgMap(options);
  }
}
