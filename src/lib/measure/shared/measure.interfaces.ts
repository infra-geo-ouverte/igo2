import { Feature } from 'src/lib/feature';

export interface Measure {
  area?: number;
  length?: number;
  lengths?: number[];
}

export interface FeatureWithMeasure extends Feature<FeatureWithMeasureProperties> {}

export interface FeatureWithMeasureProperties {
  measure: Measure;
}
