import { Md5 } from 'ts-md5';

import {
  AnyLayerOptions,
  DataSourceOptions,
  WMSDataSourceOptions,
  WMTSDataSourceOptions
} from '@igo2/geo';
import { uuid } from '@igo2/utils';

import { Entity } from '../../entity/shared/entity.interface';
import { LayerInfo } from './map.interface';
import { LAYER } from './map.enum';

export function getLayerOptionsFromEntity(entity: Entity): AnyLayerOptions | undefined {
  if (entity.meta.dataType !== LAYER) {
    return undefined;
  }

  return (entity as Entity<LayerInfo>).data.options;
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
    [lonLatStr, projectionStr] = str.split(';');
  }

  const [lonStr, latStr] = lonLatStr.split(',');
  const lonLat = [parseFloat(lonStr), parseFloat(latStr)] as [number, number];

  if (projectionStr !== undefined) {
    // TODO Reproject coordinates
  }

  return lonLat;
}

export function generateLayerIdFromSourceOptions(options: DataSourceOptions) {
  let id;
  if (options.type === 'wms') {
    id = generateWMSLayerIdFromSourceOptions(options as WMSDataSourceOptions);
  } else if (options.type === 'wmts') {
    id = generateWMTSLayerIdFromSourceOptions(options as WMTSDataSourceOptions);
  } else {
    id = uuid();
  }

  return id;
}

export function generateWMSLayerIdFromSourceOptions(options: WMSDataSourceOptions) {
  const layers = options.params.layers;
  const chain = 'wms' + options.url + layers;
  return Md5.hashStr(chain) as string;
}

export function generateWMTSLayerIdFromSourceOptions(options: WMTSDataSourceOptions) {
  const layer = options.layer;
  const chain = 'wmts' + options.url + layer;
  return Md5.hashStr(chain) as string;
}
