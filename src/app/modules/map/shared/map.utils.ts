import { LayerOptions } from '@igo2/geo';

import { Record } from '../../data/shared/data.interface';
import { LAYER } from './map.enum';

export function getLayerOptionsFromRecord(record: Record): LayerOptions | undefined {
  if (record.meta.dataType !== LAYER) {
    return undefined;
  }
  return record.data.options as LayerOptions;
}
