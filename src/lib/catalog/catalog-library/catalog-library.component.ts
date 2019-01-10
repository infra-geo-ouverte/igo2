import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { IgoMap } from '@igo2/geo';

import { EntityStore } from '../../entity/shared/store';
import { EntityStoreController } from '../../entity/shared/controller';
import { Catalog } from '../shared/catalog.interfaces';

/**
 * Component to browse a list of available catalogs
 */
@Component({
  selector: 'fadq-catalog-library',
  templateUrl: './catalog-library.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogLibaryComponent implements OnInit, OnDestroy {

  /**
   * Catalogs store controller
   */
  private controller: EntityStoreController;

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

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  /**
   * @internal
   */
  ngOnInit() {
    this.store.state.reset();
    this.controller.bind(this.store);
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    this.controller.unbind();
  }

  /**
   * When a catalog is selected, update it's state in the store
   * and emit the catalog select change event
   * @internal
   */
  onCatalogSelect(catalog: Catalog) {
    this.controller.updateEntityState(catalog, {
      selected: true,
      focused: true
    }, true);
    this.catalogSelectChange.emit({selected: true, catalog});
  }

}
