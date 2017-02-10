export interface SearchResult {
  id: string;
  title: string;
  icon?: string;

  geometry?: SearchResultGeometry;
  properties?: {[key: string]: any};
}

export interface SearchResultGeometry {
  type: 'Point' | 'LineString' | 'Polygon';
  coordinates: Array<any>;
  bbox?: Array<number>;
}
