import { GeoJsonGeometryTypes } from 'geojson';
import { EntityObject } from '../../entity/shared/entity.interface';

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
