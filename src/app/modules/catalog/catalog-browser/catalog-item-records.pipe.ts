import { Pipe, PipeTransform } from '@angular/core';

import { CatalogItem } from '../shared/catalog.interface';
import { catalogItemToRecord } from '../shared/catalog.utils';

@Pipe({
  name: 'catalogItemRecords'
})
export class CatalogItemRecordsPipe implements PipeTransform {
  transform(value: CatalogItem[], args?: any): any {
    return value.map(catalogItemToRecord);
  }
}
