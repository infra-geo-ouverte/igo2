import { Injectable } from '@angular/core';

import { IgoMap } from './map';

@Injectable()
export class MapService {

  private map: IgoMap;

  constructor() {
    this.map = new IgoMap();
  }

  getMap(): IgoMap {
    return this.map;
  }
}
