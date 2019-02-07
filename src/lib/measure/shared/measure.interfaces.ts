import { Feature } from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';

export interface Measure {
  area?: number;
  length?: number;
  lengths?: number[];
}

export interface FeatureWithMeasure extends Feature<FeatureWithMeasureProperties> {}

export interface FeatureWithMeasureProperties {
  measure: Measure;
}

export interface FeatureStoreMeasureStrategyOptions {
  map: IgoMap;
}
