import { LayerOptions, TimeFilterOptions } from '@igo2/geo';

import { EntityObject, State } from 'src/lib/entity';

import { CatalogItemType } from './catalog.enum';

export interface Catalog extends EntityObject {
  id: string;
  title: string;
  url: string;
  items?: CatalogItem[];
  type?: string;
  regFilters?: string[];
  timeFilter?: TimeFilterOptions;
}

export interface CatalogItem extends EntityObject {
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

export interface CatalogItemState extends State {
  added?: boolean;
}

export interface CatalogServiceOptions {
  baseLayers?: boolean;
  sources?: Catalog[];
  sourcesUrl?: string;
}
