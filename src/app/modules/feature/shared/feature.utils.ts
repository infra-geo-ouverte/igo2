import { Record } from '../../data/shared/data.interface';
import { FEATURE } from './feature.enum';
import { Feature } from './feature.interface';

export function getFeatureFromRecord(record: Record): Feature | undefined {
  if (record.meta.dataType !== FEATURE) {
    return undefined;
  }
  return record.data as Feature;
}
