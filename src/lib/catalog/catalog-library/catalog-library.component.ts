import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';

import { IgoMap } from '@igo2/geo';

import { EntityStore } from '../../entity/shared/store';
import { Catalog } from '../shared/catalog.interfaces';

/**
 * Component to browse a list of available catalogs
 */
@Component({
  selector: 'fadq-catalog-library',
  templateUrl: './catalog-library.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogLibaryComponent implements OnInit {

  /**
   * Store holding the catalogs
   */
  @Input() store: EntityStore<Catalog>;

  /**
   * Map to add the catalog items to
   */
  @Input() map: IgoMap;

  /**
   * Event emitted a catalog is selected or unselected
   */
  @Output() catalogSelectChange = new EventEmitter<{
    selected: boolean;
    catalog: Catalog;
  }>();

  /**
   * @internal
   */
  ngOnInit() {
    this.store.state.clear();
  }

  /**
   * When a catalog is selected, update it's state in the store
   * and emit the catalog select change event
   * @internal
   */
  onCatalogSelect(catalog: Catalog) {
    this.store.state.update(catalog, {
      selected: true,
      focused: true
    }, true);
    this.catalogSelectChange.emit({selected: true, catalog});
  }

}
