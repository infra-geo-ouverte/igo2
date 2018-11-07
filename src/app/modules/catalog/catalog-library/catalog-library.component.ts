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
import { DataStore } from '../../data/shared/store';
import { DataStoreController } from '../../data/shared/controller';
import { Catalog } from '../shared/catalog.interface';

@Component({
  selector: 'fadq-catalog-library',
  templateUrl: './catalog-library.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogLibaryComponent implements OnInit, OnDestroy {

  private controller: DataStoreController;

  @Input()
  get store(): DataStore<Record<Catalog>> {
    return this._store;
  }
  set store(value: DataStore<Record<Catalog>>) {
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

  @Output() select = new EventEmitter<Record<Catalog>>();
  @Output() unselect = new EventEmitter<Record<Catalog>>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new DataStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.store.state.reset();
    this.controller.bind(this.store);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  selectCatalog(catalog: Record<Catalog>) {
    this.controller.updateRecordState(catalog, {
      selected: true,
      focused: true
    }, true);

    this.select.emit(catalog);
  }

}
