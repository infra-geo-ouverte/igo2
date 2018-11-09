import { Entity } from '../../entity/shared/entity.interface';
import { FEATURE } from './feature.enum';
import { Feature } from './feature.interface';

export function getFeatureFromEntity(entity: Entity): Feature | undefined {
  if (entity.meta.dataType !== FEATURE) {
    return undefined;
  }
  return (entity as Entity<Feature>).data;
}
