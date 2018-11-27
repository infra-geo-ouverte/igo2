import { Injectable } from '@angular/core';

import { IgoMap } from 'src/app/modules/map';

@Injectable({
  providedIn: 'root'
})
export class MapState {

  private map: IgoMap;

  constructor() {}

  getMap(): IgoMap {
    return this.map;
  }

  setMap(map: IgoMap) {
    this.map = map;
  }
}
