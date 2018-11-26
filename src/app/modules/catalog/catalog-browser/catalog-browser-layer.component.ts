import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { getEntityTitle, getEntityIcon } from '../../entity/shared/entity.utils';
import { CatalogItemLayer } from '../shared/catalog.interface';

@Component({
  selector: 'fadq-catalog-browser-layer',
  templateUrl: './catalog-browser-layer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserLayerComponent {

  @Input()
  get layer(): CatalogItemLayer {
    return this._layer;
  }
  set layer(value: CatalogItemLayer) {
    this._layer = value;
  }
  private _layer: CatalogItemLayer;

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

  @Output() addedChange = new EventEmitter<{
    added: boolean;
    layer: CatalogItemLayer;
  }>();

  constructor() {}

  onToggleClicked() {
    this.added ? this.remove() : this.add();
  }

  private add() {
    this.added = true;
    this.addedChange.emit({added: true, layer: this.layer});
  }

  private remove() {
    this.added = false;
    this.addedChange.emit({added: false, layer: this.layer});
  }

}
