import {
  TimeFilterOptions
} from '../../../analysis/time-analyser-form/time-analyser-form.component';

import { QueryFormat } from '../query.service';
import { Layer } from './layer';

export interface LayerOptions extends olx.layer.BaseOptions {
  title: string;
  type: string;
  alias?: string;
  zIndex?: number;
  visible?: boolean;
  legend?: LayerLegendOptions;
}

export interface LayerLegendOptions {
  collapsed?: boolean;
  url?: string;
  html?: string;
  title?: string;
}

export interface FilterableLayerOptions extends LayerOptions {
  filterable?: boolean;
  timeFilter?: TimeFilterOptions;
}

export interface QueryableLayerOptions extends LayerOptions {
  queryable?: boolean;
  queryFormat?: QueryFormat;
  queryTitle?: string;
}

export interface QueryableLayer extends Layer {
  queryFormat: QueryFormat;
  queryTitle?: string;
  options: QueryableLayerOptions;
  getQueryUrl(coordinates: [number, number]): string;
}

export interface FilterableLayer extends Layer {
  options: FilterableLayerOptions;
  filterByDate(date: Date | [Date, Date]);
}
