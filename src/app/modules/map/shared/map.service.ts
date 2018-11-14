import { Injectable } from '@angular/core';

import { IgoMap } from './map';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: IgoMap;

  constructor() {}

  getMap(): IgoMap {
    return this.map;
  }

  setMap(map: IgoMap) {
    this.map = map;
  }
}
