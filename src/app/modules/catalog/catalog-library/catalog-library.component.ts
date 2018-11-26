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
import { Catalog } from '../shared/catalog.interface';

@Component({
  selector: 'fadq-catalog-library',
  templateUrl: './catalog-library.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogLibaryComponent implements OnInit, OnDestroy {

  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<Catalog> {
    return this._store;
  }
  set store(value: EntityStore<Catalog>) {
    this._store = value;
  }
  private _store;

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map;

  @Output() catalogSelectChange = new EventEmitter<{
    selected: boolean;
    catalog: Catalog;
  }>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.store.state.reset();
    this.controller.bind(this.store);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  onCatalogSelect(catalog: Catalog) {
    this.controller.updateEntityState(catalog, {
      selected: true,
      focused: true
    }, true);
    this.catalogSelectChange.emit({selected: true, catalog});
  }

  onCatalogUnselected(catalog: Catalog) {
    this.controller.updateEntityState(catalog, {
      selected: false,
      focused: false
    }, true);
    this.catalogSelectChange.emit({selected: false, catalog});
  }

}
