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

import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/datastore';
import { DataStoreController } from '../../data/shared/datastore-controller';
import { CatalogItem, CatalogItemState } from '../shared/catalog.interface';

@Component({
  selector: 'fadq-catalog-browser',
  templateUrl: './catalog-browser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserComponent implements OnInit, OnDestroy {

  private controller: DataStoreController;

  @Input()
  get store(): DataStore<Record<CatalogItem>, CatalogItemState> {
    return this._store;
  }
  set store(value: DataStore<Record<CatalogItem>, CatalogItemState>) {
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

  @Output() select = new EventEmitter<Record<CatalogItem>>();
  @Output() unselect = new EventEmitter<Record<CatalogItem>>();

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.store.resetStates();
    this.controller = new DataStoreController()
      .withChangeDetector(this.cdRef)
      .bind(this.store);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  selectCatalogItem(catalog: Record<CatalogItem>) {
    this.store.select(catalog, true, true);
    this.select.emit(catalog);
  }

}
