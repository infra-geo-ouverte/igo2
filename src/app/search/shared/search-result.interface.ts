import { SearchResultType, SearchResultFormat } from './search-result.enum';

export interface SearchResult {
  id: string;
  source: string;
  type: SearchResultType;
  format: SearchResultFormat;
  title: string;
  title_html?: string;
  icon?: string;

  projection?: string;
  geometry?: SearchResultGeometry;
  extent?: ol.Extent;
  properties?: {[key: string]: any};
}

export interface SearchResultGeometry {
  type: 'Point' | 'LineString' | 'Polygon';
  coordinates: [any];
}
