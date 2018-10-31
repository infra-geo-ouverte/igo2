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
import { Catalog } from '../shared/catalog.interface';

@Component({
  selector: 'fadq-catalogs',
  templateUrl: './catalogs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogsComponent {

  private catalogs$$: Subscription;
  private selected$$: Subscription;
  private selected: string[] = [];

  @Input()
  get store(): DataStore<Record<Catalog>> {
    return this._store;
  }
  set store(value: DataStore<Record<Catalog>>) {
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

  @Output() select = new EventEmitter<Record<Catalog>>();
  @Output() unselect = new EventEmitter<Record<Catalog>>();

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.catalogs$$ = this.store.records$
      .subscribe((catalogs: Record<Catalog>[]) => {
        this.cdRef.detectChanges()
      });

    this.selected$$ = this.store.selected$
      .pipe(
        filter((catalogs: Record<Catalog>[]) => {
          const rids = catalogs.map((catalog: Record<Catalog>) => catalog.rid);
          return !arrayEqual(rids, this.selected);
        })
      )
      .subscribe((catalogs: Record<Catalog>[]) => {
        this.selected = catalogs.map((catalog: Record<Catalog>) => catalog.rid);
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.catalogs$$.unsubscribe();
    this.selected$$.unsubscribe();
  }

  doSelect(catalog: Record<Catalog>) {
    this.selected = [catalog.rid];
    this.select.emit(catalog);
    this.store.select(catalog, true, true);
  }

}
