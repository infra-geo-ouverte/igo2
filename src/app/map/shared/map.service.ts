import { Injectable } from '@angular/core';

import { MapOptions } from './map.interface';
import { NgMap } from './map.model';


@Injectable()
export class MapService {

  constructor() { }

  createMap(options: MapOptions): NgMap {
    return new NgMap(options);
  }
}
