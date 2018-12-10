import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import { EntityStore } from 'src/lib/entity';
import { IgoMap } from 'src/lib/map';

import { Feature } from '../feature.interfaces';

export class FeatureStrategy {

  get map(): IgoMap {
    return this.layer.map as IgoMap;
  }

  get source(): FeatureDataSource {
    return this.layer.dataSource as FeatureDataSource;
  }

  constructor(
    protected layer: VectorLayer,
    protected store: EntityStore<Feature>
  ) {}

  activate() {
    throw new Error('You have to implement the method "activate".');
  }

  deactivate() {
    throw new Error('You have to implement the method "deactivate".');
  }

}
