import { Component, Input } from '@angular/core';

import { IgoMap } from '../../map/shared/map';
import { getEntityTitle, getEntityIcon } from '../../entity/shared/entity.utils';
import { Catalog } from '../shared/catalog.interface';

@Component({
  selector: 'fadq-catalog-library-item',
  templateUrl: './catalog-library-item.component.html'
})
export class CatalogLibaryItemComponent {

  @Input()
  get catalog(): Catalog {
    return this._catalog;
  }
  set catalog(value: Catalog) {
    this._catalog = value;
  }
  private _catalog: Catalog;

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map;

  get title(): string {
    return getEntityTitle(this.catalog);
  }

  get icon(): string {
    return getEntityIcon(this.catalog) || 'photo_library';
  }
}
