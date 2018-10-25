export interface SearchSourceOptions {
  title?: string;
  searchUrl?: string;
  enabled?: boolean;
  order?: number;
  distance?: number;
  zoomMaxOnSelect?: number;
  params?: { [key: string]: string };
}
