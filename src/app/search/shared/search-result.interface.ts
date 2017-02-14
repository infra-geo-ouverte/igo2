export interface SearchResult {
  id: string;
  source: string;
  title: string;
  icon?: string;

  geometry?: SearchResultGeometry;
  bbox?: [number, number, number, number];
  properties?: {[key: string]: any};
}

export interface SearchResultGeometry {
  type: 'Point' | 'LineString' | 'Polygon';
  coordinates: [any];
}
