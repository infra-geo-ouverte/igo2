export interface SearchResult {
  id: string;
  source: string;
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
