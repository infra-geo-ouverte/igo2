import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IgoMap } from 'src/app/modules/map';
import { getEntityTitle, getEntityIcon } from 'src/app/modules/entity';

import { Catalog } from '../shared/catalog.interfaces';

@Component({
  selector: 'fadq-catalog-library-item',
  templateUrl: './catalog-library-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
