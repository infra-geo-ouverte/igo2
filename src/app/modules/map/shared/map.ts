import {
  IgoMap as IgoLibMap,
  MapOptions
} from '@igo2/geo';

import { Overlay } from 'src/app/modules/overlay';

export class IgoMap extends IgoLibMap {

  public overlay: Overlay;

  constructor(options?: MapOptions) {
    super(options);
    this.overlay = new Overlay(this);
  }
}
