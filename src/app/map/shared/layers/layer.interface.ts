import {
  TimeFilterOptions
} from '../../../analysis/time-analyser-form/time-analyser-form.component';

import { QueryFormat } from '../query.service';

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

export interface FilterableLayerOptions {
  filterable?: boolean;
  timeFilter?: TimeFilterOptions;
}

export interface QueryableLayerOptions {
  queryable?: boolean;
}

export interface QueryableLayer {
  queryFormat: QueryFormat;
  queryTitle?: string;
  options: QueryableLayerOptions;
  getQueryUrl(coordinates: [number, number]): string;
}

export interface FilterableLayer {
  options: FilterableLayerOptions;
  filterByDate(date: Date | [Date, Date]);
}
