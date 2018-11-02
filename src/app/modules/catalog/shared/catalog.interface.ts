import { TimeFilterOptions } from '@igo2/geo';
import { RecordState } from '../../data/shared/data.interface';
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

export interface CatalogItemState extends RecordState {
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
