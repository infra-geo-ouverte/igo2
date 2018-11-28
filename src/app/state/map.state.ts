import { Injectable } from '@angular/core';

import { IgoMap } from 'src/app/modules/map';

@Injectable({
  providedIn: 'root'
})
export class MapState {

  get map(): IgoMap {
    return this._map;
  }
  private _map: IgoMap;

  constructor() {}

  setMap(map: IgoMap) {
    this._map = map;
  }
}
