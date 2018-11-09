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
import { DataStore } from '../../data/shared/store';
import { DataState} from '../../data/shared/state';
import { DataStoreController } from '../../data/shared/controller';
import {
  CatalogItem,
  CatalogItemGroup,
  CatalogItemLayer,
  CatalogItemState
} from '../shared/catalog.interface';
import { CatalogItemType } from '../shared/catalog.enum';
import { catalogItemToRecord } from '../shared/catalog.utils';

export interface CatalogBrowserGroupEvent {
  group:  Record<CatalogItemGroup>;
  items:  Record<CatalogItem>[];
}

@Component({
  selector: 'fadq-catalog-browser-group',
  templateUrl: './catalog-browser-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserGroupComponent implements OnInit, OnDestroy {

  public collapsed = true;

  private store: DataStore<Record<CatalogItem>, CatalogItemState>;
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

  @Input()
  get added(): boolean {
    return this._added;
  }
  set added(value: boolean) {
    this._added = value;
  }
  private _added: boolean;

  @Output() layerSelect = new EventEmitter<Record<CatalogItemLayer>>();
  @Output() layerUnselect = new EventEmitter<Record<CatalogItemLayer>>();
  @Output() layerAdd = new EventEmitter<Record<CatalogItemLayer>>();
  @Output() layerRemove = new EventEmitter<Record<CatalogItemLayer>>();
  @Output() add = new EventEmitter<CatalogBrowserGroupEvent>();
  @Output() remove = new EventEmitter<CatalogBrowserGroupEvent>();

  get title(): string {
    return getRecordTitle(this.group);
  }

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new DataStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.store = new DataStore(this.state);
    this.store.setRecords(
      this.group.data.items.map(catalogItemToRecord),
      true
  );
    this.controller.bind(this.store);
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

  toggleCollapsed(collapsed: boolean) {
    if (collapsed === undefined) {
      return;
    }
    this.collapsed = collapsed;
  }

  handleToggle() {
    this.added ? this.doRemove() : this.doAdd();
  }

  handleAddLayer(layer: Record<CatalogItemLayer>) {
    this.layerAdd.emit(layer);
    this.tryToggleGroup(layer, true);
  }

  handleRemoveLayer(layer: Record<CatalogItemLayer>) {
    this.layerRemove.emit(layer);
    this.tryToggleGroup(layer, false);
  }

  private doAdd() {
    this.added = true;
    this.add.emit({
      group: this.group,
      items: this.store.records
    });
  }

  private doRemove() {
    this.added = false;
    this.remove.emit({
      group: this.group,
      items: this.store.records
    });
  }

  private tryToggleGroup(layer: Record<CatalogItemLayer>, added) {
    const layersAdded = this.store.records
      .filter((record: Record<CatalogItem>) => record.rid !== layer.rid)
      .map((record: Record<CatalogItem>) => {
        return this.store.getRecordState(record).added || false;
      });

    if (layersAdded.every((value) => value === added)) {
      added ? this.doAdd() : this.doRemove();
    }
  }

}
