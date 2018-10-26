import { AnyLayerOptions } from '@igo2/geo';
import { Record } from '../../../data/shared/data.interface';

export interface ILayerResult {
  id: string;
  source: ILayerResultSource;
  highlight: ILayerResultHighlight;
}

export interface ILayerResultSource {
  title: string;
  groupTitle: string;
  abstract: string;
  format: 'wms' | 'wfs';
  url: string;
  type: string;
  name: string;
}

export interface ILayerResultHighlight {
  title: string;
}

export interface ILayerResponse {
  items: ILayerResult[];
}

export interface ILayerData {
  id: string;
  properties: { [key: string]: any };
  options: AnyLayerOptions;
}

export interface ILayerRecord extends Record {
  data: ILayerData;
}
