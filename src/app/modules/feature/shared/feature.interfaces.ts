import * as olstyle from 'ol/style';

import { GeoJsonGeometryTypes } from 'geojson';
import { EntityObject } from 'src/app/modules/entity';

import { FeatureMotion } from './feature.enum';

export interface Feature extends EntityObject {
  type: string;
  projection: string;
  geometry: FeatureGeometry;
  extent: [number, number, number, number];
  properties: { [key: string]: any };
}

export interface FeatureGeometry {
  type: GeoJsonGeometryTypes;
  coordinates: any;
}

export interface FeatureLoadStrategyOptions {}

export interface FeatureSelectStrategyOptions {
  motion?: FeatureMotion;
  style?: olstyle.Style;
}
