import { RecordState } from '../../data/shared/data.interface';

export interface Catalog {
  id?: string;
  title?: string;
  url?: string;
  type?: string;
  regFilters?: Array<string>;
}

export interface CatalogServiceOptions {
  baseLayers?: boolean;
  sources?: Catalog[];
}

export interface CatalogItemState extends RecordState {
  added?: boolean;
  collapsed?: boolean;
}