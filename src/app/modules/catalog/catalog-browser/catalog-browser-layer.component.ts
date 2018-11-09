import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { getEntityTitle, getEntityIcon } from '../../entity/shared/entity.utils';
import { Entity } from '../../entity/shared/entity.interface';
import { CatalogItemLayer } from '../shared/catalog.interface';

@Component({
  selector: 'fadq-catalog-browser-layer',
  templateUrl: './catalog-browser-layer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserLayerComponent {

  @Input()
  get layer(): Entity<CatalogItemLayer> {
    return this._layer;
  }
  set layer(value: Entity<CatalogItemLayer>) {
    this._layer = value;
  }
  private _layer: Entity<CatalogItemLayer>;

  @Input()
  get added(): boolean {
    return this._added;
  }
  set added(value: boolean) {
    this._added = value;
  }
  private _added: boolean;

  get title(): string {
    return getEntityTitle(this.layer);
  }

  get icon(): string {
    return getEntityIcon(this.layer) || 'layers';
  }

  @Output() add = new EventEmitter<Entity<CatalogItemLayer>>();
  @Output() remove = new EventEmitter<Entity<CatalogItemLayer>>();

  constructor() {}

  handleToggle() {
    this.added ? this.doRemove() : this.doAdd();
  }

  private doAdd() {
    this.added = true;
    this.add.emit(this.layer);
  }

  private doRemove() {
    this.added = false;
    this.remove.emit(this.layer);
  }

}
