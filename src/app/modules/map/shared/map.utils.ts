import { LayerOptions } from '@igo2/geo';

import { Record } from '../../data/shared/data.interface';
import { LAYER } from './map.enum';

export function getLayerOptionsFromRecord(record: Record): LayerOptions | undefined {
  if (record.meta.dataType !== LAYER) {
    return undefined;
  }
  return record.data.options as LayerOptions;
}


export function stringToLonLat(str: string): [number, number] | undefined {
  const coordPattern =  '[-+]?[\\d]{1,8}(\\.)?(\\d+)?';
  const projectionPattern = '(;[\\d]{4,5})';
  const lonLatPattern = `^${coordPattern},(\\s)*${coordPattern}${projectionPattern}?`;
  const lonLatRegex = new RegExp(lonLatPattern, 'g');

  if (!lonLatRegex.test(str)) {
    return undefined;
  }

  let lonLatStr = str;
  let projectionStr;

  const projectionRegex = new RegExp(projectionPattern, 'g');
  if (projectionRegex.test(str)) {
    [lonLatStr, projectionStr] = term.split(';');
  }

  const [lonStr, latStr] = lonLatStr.split(',');
  const lonLat = [parseFloat(lonStr), parseFloat(latStr)];

  if (projectionStr !== undefined) {
    // TODO Reproject coordinates
  }

  return lonLat;
}
