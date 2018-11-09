import { Component, Input } from '@angular/core';

import { IgoMap } from '@igo2/geo';

import { getRecordTitle, getRecordIcon } from '../../data/shared/data.utils';
import { Record } from '../../data/shared/data.interface';
import { Catalog } from '../shared/catalog.interface';

@Component({
  selector: 'fadq-catalog-library-item',
  templateUrl: './catalog-library-item.component.html'
})
export class CatalogLibaryItemComponent {

  @Input()
  get catalog(): Record<Catalog> {
    return this._catalog;
  }
  set catalog(value: Record<Catalog>) {
    this._catalog = value;
  }
  private _catalog: Record<Catalog>;

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map;

  get title(): string {
    return getRecordTitle(this.catalog);
  }

  get icon(): string {
    return getRecordIcon(this.catalog) || 'photo_library';
  }
}
