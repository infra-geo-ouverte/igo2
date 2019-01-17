import { FormGroup } from '@angular/forms';

import * as olstyle from 'ol/style';

import { GeoJsonGeometryTypes } from 'geojson';

import { EntityObject, EntityMeta } from 'src/lib/entity';
import { IgoMap } from 'src/lib/map';
import { FeatureMotion } from './feature.enum';

export interface Feature extends EntityObject {
  type: string;
  projection: string;
  geometry: FeatureGeometry;
  properties: { [key: string]: any };
  extent?: [number, number, number, number];
  meta?: FeatureMeta;
}

export interface FeatureMeta extends EntityMeta {
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
}

export interface FeatureFormSubmitEvent {
  form: FormGroup;
  feature: Feature | undefined;
  data: Feature;
}
