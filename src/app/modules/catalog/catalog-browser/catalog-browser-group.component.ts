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

  @Output() addedChange = new EventEmitter<{
    added: boolean;
    group: CatalogItemGroup;
  }>();

  @Output() layerAddedChange = new EventEmitter<{
    added: boolean;
    layer: CatalogItemLayer;
  }>();

  get title(): string {
    return getEntityTitle(this.group);
  }

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.store = new EntityStore<CatalogItem, CatalogItemState>(this.state);
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

  onToggleClicked() {
    this.added ? this.remove() : this.add();
  }

  onLayerAddedChange(event: {added: boolean, layer: CatalogItemLayer}) {
    this.layerAddedChange.emit(event);
    this.tryToggleGroup(event.layer, event.added);
  }

  private add() {
    this.added = true;
    this.addedChange.emit({
      added: true,
      group: this.group
    });
  }

  private remove() {
    this.added = false;
    this.addedChange.emit({
      added: false,
      group: this.group
    });
  }

  private tryToggleGroup(layer: CatalogItemLayer, add: boolean) {
    const layersAdded = this.store.entities
      .filter((item: CatalogItem) => getEntityId(item) !== getEntityId(layer))
      .map((item: CatalogItem) => {
        return this.store.getEntityState(item).added || false;
      });

    if (layersAdded.every((value) => value === add)) {
      add ? this.add() : this.remove();
    }
  }

}
