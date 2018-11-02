import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { getRecordTitle, getRecordIcon } from '../../data/shared/data.utils';
import { Record } from '../../data/shared/data.interface';
import { CatalogItemLayer } from '../shared/catalog.interface';

@Component({
  selector: 'fadq-catalog-browser-layer',
  templateUrl: './catalog-browser-layer.component.html',
  styleUrls: ['./catalog-browser-layer.component.scss'],
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

  @Input()
  get color() {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
  }
  private _color = 'primary';

  get title(): string {
    return getRecordTitle(this.layer);
  }

  get icon(): string {
    return getRecordIcon(this.layer) || 'layers';
  }

  constructor() {}

}
