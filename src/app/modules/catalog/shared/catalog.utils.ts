import { Record } from '../../data/shared/data.interface';
import { CatalogItem } from './catalog.interface';

export function catalogItemToRecord(item: CatalogItem): Record<CatalogItem> {
  return {
    rid: item.id,
    data: item,
    meta: {
      id: item.id,
      titleProperty: 'title'
    }
  };
}
