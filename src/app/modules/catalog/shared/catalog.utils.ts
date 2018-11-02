import { Record } from '../../data/shared/data.interface';
import { Catalog, CatalogItem } from './catalog.interface';

export function catalogToRecord(catalog: Catalog): Record<Catalog> {
  return {
    rid: catalog.title,
    data: catalog,
    meta: {
      titleProperty: 'title'
    }
  };
}

export function catalogItemToRecord(item: CatalogItem): Record<CatalogItem> {
  return {
    rid: item.id,
    data: item,
    meta: {
      titleProperty: 'title'
    }
  };
}
