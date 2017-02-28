import { Injectable } from '@angular/core';

import { IgoMap } from './map';


@Injectable()
export class MapService {

  private map: IgoMap;

  constructor() { }

  getMap(): IgoMap {
    if (!this.map) {
      this.map = new IgoMap();
    }

    return this.map;
  }
}
