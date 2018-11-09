import { IgoMap } from '@igo2/geo';

import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { Feature } from '../../feature/shared/feature.interface';

export class Overlay {

  private map: IgoMap;
  private store: EntityStore<Entity<Feature>>;

  constructor(map: IgoMap) {
    this.map = map;
    this.store = new EntityStore<Entity<Feature>>();
  }

}
