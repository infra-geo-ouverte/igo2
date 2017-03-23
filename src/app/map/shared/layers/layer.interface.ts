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
  queryable?: boolean;
  filterable?: boolean;
  timeFilter?: TimeFilterOptions;
}

export interface LayerLegendOptions {
  collapsed?: boolean;
  url?: string;
  html?: string;
  title?: string;
}

export interface QueryableLayer {
  queryFormat: QueryFormat;
  queryTitle?: string;
  getQueryUrl(coordinates: [number, number]): string;
}

export interface FilterableLayer {
  filterByDate(date: Date | [Date, Date]);
}
