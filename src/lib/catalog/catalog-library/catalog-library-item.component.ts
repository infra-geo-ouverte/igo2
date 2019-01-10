import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IgoMap } from 'src/lib/map';
import { getEntityTitle, getEntityIcon } from 'src/lib/entity';

import { Catalog } from '../shared/catalog.interfaces';

/**
 * Catalog library item
 */
@Component({
  selector: 'fadq-catalog-library-item',
  templateUrl: './catalog-library-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogLibaryItemComponent {

  /**
   * Catalog
   */
  @Input() catalog: Catalog;

  /**
   * Map to add the catalog items to
   */
  @Input() map: IgoMap;

  /**
   * @internal
   */
  get title(): string { return getEntityTitle(this.catalog); }

  /**
   * @internal
   */
  get icon(): string { return getEntityIcon(this.catalog) || 'photo_library'; }
}
