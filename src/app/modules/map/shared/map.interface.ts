import { AnyLayerOptions } from '@igo2/geo';

import { Record } from '../../data/shared/data.interface';

export interface LayerRecordData {
  properties: { [key: string]: any };
  layer: AnyLayerOptions;
}

export interface LayerRecord extends Record {
  data: LayerRecordData;
}
