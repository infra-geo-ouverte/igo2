import { Feature } from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';
import { MeasureAreaUnit, MeasureLengthUnit } from './measure.enum';

export interface Measure {
  area?: number;
  length?: number;
  lengths?: number[];
}

export interface MeasurerDialogData {
  area: number;
  areaUnit: MeasureAreaUnit;
  length: number;
  lengthUnit: MeasureLengthUnit;
}

export interface FeatureWithMeasure extends Feature<FeatureWithMeasureProperties> {}

export interface FeatureWithMeasureProperties {
  measure: Measure;
}

export interface FeatureStoreMeasureStrategyOptions {
  map: IgoMap;
}
