import { GeoJsonGeometryTypes } from 'geojson';

export interface Feature {
  id: string;
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
