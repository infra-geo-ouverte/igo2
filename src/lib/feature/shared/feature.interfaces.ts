import * as olstyle from 'ol/style';

import { GeoJsonGeometryTypes } from 'geojson';

import { EntityObject } from 'src/lib/entity';
import { IgoMap } from 'src/lib/map';
import { FeatureMotion } from './feature.enum';

export interface Feature extends EntityObject {
  type: string;
  projection: string;
  geometry: FeatureGeometry;
  properties: { [key: string]: any };
  extent?: [number, number, number, number];
}

export interface FeatureGeometry {
  type: GeoJsonGeometryTypes;
  coordinates: any;
}

export interface FeatureStoreSelectionStrategyOptions {
  map: IgoMap;
  motion?: FeatureMotion;
  style?: olstyle.Style;
}
