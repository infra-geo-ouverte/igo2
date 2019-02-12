import { LayerOptions, TimeFilterOptions } from '@igo2/geo';

import { EntityState } from 'src/lib/entity';
import { CatalogItemType } from './catalog.enum';

export interface Catalog {
  id: string;
  title: string;
  url: string;
  items?: CatalogItem[];
  type?: string;
  regFilters?: string[];
  timeFilter?: TimeFilterOptions;
}

export interface CatalogItem {
  id: string;
  title: string;
  type: CatalogItemType;
}

export interface CatalogItemLayer extends CatalogItem {
  options: LayerOptions;
}

export interface CatalogItemGroup extends CatalogItem {
  items?: CatalogItem[];
}

export interface CatalogItemState extends EntityState {
  added?: boolean;
}

export interface CatalogServiceOptions {
  baseLayers?: boolean;
  sources?: Catalog[];
  sourcesUrl?: string;
}
