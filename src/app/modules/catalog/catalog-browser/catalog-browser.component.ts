import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IgoMap } from '@igo2/geo';

import { arrayEqual } from '../../utils/array';
import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/datastore';
import { LayerInfo, LayerGroup } from '../../map/shared/map.interface';
import { CatalogItemState } from '../shared/catalog.interface';

export type CatalogItem = LayerInfo | LayerGroup;

@Component({
  selector: 'fadq-catalog-browser',
  templateUrl: './catalog-browser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserComponent {

  private items$$: Subscription;
  private selected$$: Subscription;
  private selected: string[] = [];

  @Input()
  get store(): DataStore<Record<CatalogItem>, CatalogItemState> {
    return this._store;
  }
  set store(value: DataStore<Record<CatalogItem>, CatalogItemState>) {
    this._store = value;
  }
  private _store;

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map;

  @Output() select = new EventEmitter<Record<CatalogItem>>();
  @Output() unselect = new EventEmitter<Record<CatalogItem>>();

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.items$$ = this.store.records$
      .subscribe((items: Record<CatalogItem>[]) => this.cdRef.detectChanges());

    this.selected$$ = this.store.selected$
      .pipe(
        filter((items: Record<CatalogItem>[]) => {
          const rids = items.map((item: Record<CatalogItem>) => item.rid);
          return !arrayEqual(rids, this.selected);
        })
      )
      .subscribe((items: Record<CatalogItem>[]) => {
        this.selected = items.map((item: Record<CatalogItem>) => item.rid);
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.items$$.unsubscribe();
    this.selected$$.unsubscribe();
  }

  doSelect(item: Record<CatalogItem>) {
    this.selected = [item.rid];
    this.select.emit(item);
    this.store.select(item, true, true);
  }

}
