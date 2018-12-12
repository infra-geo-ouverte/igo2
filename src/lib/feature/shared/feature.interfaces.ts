import * as olstyle from 'ol/style';
import OlSelect from 'ol/interaction/Select';

import { GeoJsonGeometryTypes } from 'geojson';
import { EntityObject } from 'src/lib/entity';

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
