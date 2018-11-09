import { Entity } from '../../entity/shared/entity.interface';
import { Catalog, CatalogItem } from './catalog.interface';

export function catalogToEntity(catalog: Catalog): Entity<Catalog> {
  return {
    rid: catalog.title,
    data: catalog,
    meta: {
      titleProperty: 'title'
    }
  };
}

export function catalogItemToEntity(item: CatalogItem): Entity<CatalogItem> {
  return {
    rid: item.id,
    data: item,
    meta: {
      titleProperty: 'title'
    }
  };
}
