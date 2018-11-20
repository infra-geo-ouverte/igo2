import { LayerOptions, TimeFilterOptions } from '@igo2/geo';
import { Entity, State } from '../../entity/shared/entity.interface';
import { CatalogItemType } from './catalog.enum';

export interface Catalog extends Entity {
  id: string;
  title: string;
  url: string;
  items?: CatalogItem[];
  type?: string;
  regFilters?: Array<string>;
  timeFilter?: TimeFilterOptions;
}

export interface CatalogItem extends Entity {
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
