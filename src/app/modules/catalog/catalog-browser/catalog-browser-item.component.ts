import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { getRecordTitle, getRecordIcon } from '../../data/shared/data.utils';
import { Record } from '../../data/shared/data.interface';
import { CatalogItem } from '../shared/catalog.interface';
import { CatalogItemType } from '../shared/catalog.enum';

@Component({
  selector: 'fadq-catalog-browser-item',
  templateUrl: './catalog-browser-item.component.html',
  styleUrls: ['./catalog-browser-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserItemComponent {

  @Input()
  get item(): Record<CatalogItem> {
    return this._item;
  }
  set item(value: Record<CatalogItem>) {
    this._item = value;
  }
  private _item: Record<CatalogItem>;

  @Input()
  get added(): boolean {
    return this._added;
  }
  set added(value: boolean) {
    this._added = value;
  }
  private _added: boolean;

  @Input()
  get collapsed(): boolean {
    return this._collapsed;
  }
  set collapsed(value: boolean) {
    this._collapsed = value;
  }
  private _collapsed: boolean;

  @Input()
  get color() {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
  }
  private _color = 'primary';

  get isGroup(): boolean {
    return this.item.data.type === CatalogItemType.Group;
  }

  get isLayer(): boolean {
    return this.item.data.type === CatalogItemType.Layer;
  }

  get title(): string {
    return getRecordTitle(this.item);
  }

  get icon(): string {
    return getRecordIcon(this.item) || 'layers';
  }

  constructor() {}
}
