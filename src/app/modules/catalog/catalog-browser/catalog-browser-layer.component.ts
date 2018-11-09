import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { getRecordTitle, getRecordIcon } from '../../data/shared/data.utils';
import { Record } from '../../data/shared/data.interface';
import { CatalogItemLayer } from '../shared/catalog.interface';

@Component({
  selector: 'fadq-catalog-browser-layer',
  templateUrl: './catalog-browser-layer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserLayerComponent {

  @Input()
  get layer(): Record<CatalogItemLayer> {
    return this._layer;
  }
  set layer(value: Record<CatalogItemLayer>) {
    this._layer = value;
  }
  private _layer: Record<CatalogItemLayer>;

  @Input()
  get added(): boolean {
    return this._added;
  }
  set added(value: boolean) {
    this._added = value;
  }
  private _added: boolean;

  get title(): string {
    return getRecordTitle(this.layer);
  }

  get icon(): string {
    return getRecordIcon(this.layer) || 'layers';
  }

  @Output() add = new EventEmitter<Record<CatalogItemLayer>>();
  @Output() remove = new EventEmitter<Record<CatalogItemLayer>>();

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
