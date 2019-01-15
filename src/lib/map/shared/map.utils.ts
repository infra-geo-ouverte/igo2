import { Md5 } from 'ts-md5';

import {
  DataSourceOptions,
  WMSDataSourceOptions,
  WMTSDataSourceOptions
} from '@igo2/geo';
import { uuid } from '@igo2/utils';

/**
 * This method extracts a [lon, lat] tuple from a string.
 * @param str Any string
 * @returns A [lon, lat] tuple if one is found in the string
 * @todo Reproject coordinates
 */
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

/**
 * Generate a layer id from it's datasource options.
 * @param options Data source options
 * @returns A layer id
 */
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

/**
 * Generate a layer id from WMS data source options
 * @param options WMS data source options
 * @returns A md5 hash of the the url and layers
 */
export function generateWMSLayerIdFromSourceOptions(options: WMSDataSourceOptions) {
  const layers = options.params.layers;
  const chain = 'wms' + options.url + layers;
  return Md5.hashStr(chain) as string;
}

/**
 * Generate a layer id from WMTS data source options
 * @param options WMTS data source options
 * @returns A md5 hash of the the url and layer
 */
export function generateWMTSLayerIdFromSourceOptions(options: WMTSDataSourceOptions) {
  const layer = options.layer;
  const chain = 'wmts' + options.url + layer;
  return Md5.hashStr(chain) as string;
}
