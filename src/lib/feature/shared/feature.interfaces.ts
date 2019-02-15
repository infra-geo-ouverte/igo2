import { FormGroup } from '@angular/forms';

import * as olstyle from 'ol/style';

import { GeoJsonGeometryTypes } from 'geojson';

import { EntityKey } from 'src/lib/entity';
import { IgoMap } from 'src/lib/map';
import { FeatureMotion } from './feature.enum';

export interface Feature<P = {[key: string]: any}> {
  type: string;
  projection: string;
  geometry: FeatureGeometry;
  properties: P;
  extent?: [number, number, number, number];
  meta?: FeatureMeta;
}

export interface FeatureMeta {
  id: EntityKey;
  title?: string;
  mapTitle?: string;
}

export interface FeatureGeometry {
  type: GeoJsonGeometryTypes;
  coordinates: any;
}

export interface FeatureStoreSelectionStrategyOptions {
  map: IgoMap;
  motion?: FeatureMotion;
  style?: olstyle.Style;
  many?: boolean;
}

export interface FeatureFormSubmitEvent {
  form: FormGroup;
  feature: Feature | undefined;
  data: Feature;
}
