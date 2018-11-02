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

import { getRecordTitle } from '../../data/shared/data.utils';
import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/datastore';
import { DataState} from '../../data/shared/datastate';
import { DataStoreController } from '../../data/shared/datastore-controller';
import { CatalogItem, CatalogItemGroup, CatalogItemLayer, CatalogItemState } from '../shared/catalog.interface';
import { CatalogItemType } from '../shared/catalog.enum';
import { catalogItemToRecord } from '../shared/catalog.utils';

@Component({
  selector: 'fadq-catalog-browser-group',
  templateUrl: './catalog-browser-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserGroupComponent implements OnInit, OnDestroy {
 
  private store: DataStore<Record<CatalogItem>>;
  private controller: DataStoreController;

  @Input()
  get group(): Record<CatalogItemGroup> {
    return this._group;
  }
  set group(value: Record<CatalogItemGroup>) {
    this._group = value;
  }
  private _group: Record<CatalogItemGroup>;

  @Input()
  get state(): DataState<CatalogItemState> {
    return this._state;
  }
  set state(value: DataState<CatalogItemState>) {
    this._state = value;
  }
  private _state: DataState<CatalogItemState>;

  @Output() layerSelect = new EventEmitter<Record<CatalogItemLayer>>();
  @Output() layerUnselect = new EventEmitter<Record<CatalogItemLayer>>();

  get title(): string {
    return getRecordTitle(this.group);
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.store = new DataStore(this.state);
    this.store.setRecords(this.group.data.items.map(catalogItemToRecord), true);
    this.controller = new DataStoreController()
      .withChangeDetector(this.cdRef)
      .bind(this.store);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  isGroup(item: Record<CatalogItem>): boolean {
    return item.data.type === CatalogItemType.Group;
  }

  isLayer(item: Record<CatalogItem>): boolean {
    return item.data.type === CatalogItemType.Layer;
  }

}
