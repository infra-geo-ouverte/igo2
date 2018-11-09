import { TimeFilterOptions } from '@igo2/geo';
import { State } from '../../entity/shared/entity.interface';
import { LayerInfo } from '../../map/shared/map.interface';
import { CatalogItemType } from './catalog.enum';

export interface Catalog {
  title: string;
  url: string;
  items?: CatalogItem[];
  type?: string;
  regFilters?: Array<string>;
  timeFilter?: TimeFilterOptions;
}

export interface CatalogServiceOptions {
  baseLayers?: boolean;
  sources?: Catalog[];
  sourcesUrl?: string;
}

export interface CatalogItemState extends State {
  added?: boolean;
}

export interface CatalogItem {
  id: string;
  title: string;
  type: CatalogItemType;
}

export interface CatalogItemLayer extends CatalogItem, LayerInfo {}

export interface CatalogItemGroup extends CatalogItem {
  items?: CatalogItem[];
}
