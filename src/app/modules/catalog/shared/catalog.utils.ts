import { Record } from '../../data/shared/data.interface';
import { Catalog, CatalogItem } from './catalog.interface';

export function setCatalogItems(catalog: Catalog, items: CatalogItem[]) {
  catalog.items = items;
}

export function catalogItemToRecord(item: CatalogItem): Record<CatalogItem> {
  return {
    rid: item.id,
    data: item,
    meta: {
      id: item.id,
      titleProperty: 'title'
    }
  }
}
