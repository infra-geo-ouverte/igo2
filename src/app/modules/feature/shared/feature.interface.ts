import { GeoJsonGeometryTypes } from 'geojson';

import { Record } from '../../data/shared/data.interface';

export interface Feature {
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

export interface FeatureRecord extends Record {
  data: Feature;
}
