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

import { getEntityTitle } from '../../entity/shared/entity.utils';
import { Entity } from '../../entity/shared/entity.interface';
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
import { catalogItemToEntity } from '../shared/catalog.utils';

export interface CatalogBrowserGroupEvent {
  group:  Entity<CatalogItemGroup>;
  items:  Entity<CatalogItem>[];
}

@Component({
  selector: 'fadq-catalog-browser-group',
  templateUrl: './catalog-browser-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserGroupComponent implements OnInit, OnDestroy {

  public collapsed = true;
  public store: EntityStore<Entity<CatalogItem>, CatalogItemState>;

  private controller: EntityStoreController;

  @Input()
  get group(): Entity<CatalogItemGroup> {
    return this._group;
  }
  set group(value: Entity<CatalogItemGroup>) {
    this._group = value;
  }
  private _group: Entity<CatalogItemGroup>;

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

  @Output() layerSelect = new EventEmitter<Entity<CatalogItemLayer>>();
  @Output() layerUnselect = new EventEmitter<Entity<CatalogItemLayer>>();
  @Output() layerAdd = new EventEmitter<Entity<CatalogItemLayer>>();
  @Output() layerRemove = new EventEmitter<Entity<CatalogItemLayer>>();
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
    this.store.setEntities(
      this.group.data.items.map(catalogItemToEntity),
      true
  );
    this.controller.bind(this.store);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  isGroup(item: Entity<CatalogItem>): boolean {
    return item.data.type === CatalogItemType.Group;
  }

  isLayer(item: Entity<CatalogItem>): boolean {
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

  handleAddLayer(layer: Entity<CatalogItemLayer>) {
    this.layerAdd.emit(layer);
    this.tryToggleGroup(layer, true);
  }

  handleRemoveLayer(layer: Entity<CatalogItemLayer>) {
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

  private tryToggleGroup(layer: Entity<CatalogItemLayer>, added) {
    const layersAdded = this.store.entities
      .filter((entity: Entity<CatalogItem>) => entity.rid !== layer.rid)
      .map((entity: Entity<CatalogItem>) => {
        return this.store.getEntityState(entity).added || false;
      });

    if (layersAdded.every((value) => value === added)) {
      added ? this.doAdd() : this.doRemove();
    }
  }

}
