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

import { getEntityId, getEntityTitle } from '../../entity/shared/entity.utils';
import { EntityStore } from '../../entity/shared/store';
import { EntityState} from '../../entity/shared/state';
import { EntityStoreController } from '../../entity/shared/controller';
import {
  CatalogItem,
  CatalogItemGroup,
  CatalogItemLayer,
  CatalogItemState
} from '../shared/catalog.interface';
import { CatalogItemType } from '../shared/catalog.enum';

export interface CatalogBrowserGroupEvent {
  group:  CatalogItemGroup;
  items:  CatalogItem[];
}

@Component({
  selector: 'fadq-catalog-browser-group',
  templateUrl: './catalog-browser-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserGroupComponent implements OnInit, OnDestroy {

  public collapsed = true;
  public store: EntityStore<CatalogItem, CatalogItemState>;

  private controller: EntityStoreController;

  @Input()
  get group(): CatalogItemGroup {
    return this._group;
  }
  set group(value: CatalogItemGroup) {
    this._group = value;
  }
  private _group: CatalogItemGroup;

  @Input()
  get state(): EntityState<CatalogItemState> {
    return this._state;
  }
  set state(value: EntityState<CatalogItemState>) {
    this._state = value;
  }
  private _state: EntityState<CatalogItemState>;

  @Input()
  get added(): boolean {
    return this._added;
  }
  set added(value: boolean) {
    this._added = value;
  }
  private _added: boolean;

  @Output() layerSelect = new EventEmitter<CatalogItemLayer>();
  @Output() layerUnselect = new EventEmitter<CatalogItemLayer>();
  @Output() layerAdd = new EventEmitter<CatalogItemLayer>();
  @Output() layerRemove = new EventEmitter<CatalogItemLayer>();
  @Output() add = new EventEmitter<CatalogBrowserGroupEvent>();
  @Output() remove = new EventEmitter<CatalogBrowserGroupEvent>();

  get title(): string {
    return getEntityTitle(this.group);
  }

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.store = new EntityStore(this.state);
    this.store.setEntities(this.group.items, true);
    this.controller.bind(this.store);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  isGroup(item: CatalogItem): boolean {
    return item.type === CatalogItemType.Group;
  }

  isLayer(item: CatalogItem): boolean {
    return item.type === CatalogItemType.Layer;
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

  handleAddLayer(layer: CatalogItemLayer) {
    this.layerAdd.emit(layer);
    this.tryToggleGroup(layer, true);
  }

  handleRemoveLayer(layer: CatalogItemLayer) {
    this.layerRemove.emit(layer);
    this.tryToggleGroup(layer, false);
  }

  private doAdd() {
    this.added = true;
    this.add.emit({
      group: this.group,
      items: this.store.entities
    });
  }

  private doRemove() {
    this.added = false;
    this.remove.emit({
      group: this.group,
      items: this.store.entities
    });
  }

  private tryToggleGroup(layer: CatalogItemLayer, added) {
    const layersAdded = this.store.entities
      .filter((item: CatalogItem) => getEntityId(item) !== getEntityId(layer))
      .map((item: CatalogItem) => {
        return this.store.getEntityState(item).added || false;
      });

    if (layersAdded.every((value) => value === added)) {
      added ? this.doAdd() : this.doRemove();
    }
  }

}
