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

import { IgoMap, Layer, LayerService } from '@igo2/geo';

import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/store';
import { DataStoreController } from '../../data/shared/controller';
import { CatalogItem, CatalogItemLayer, CatalogItemState } from '../shared/catalog.interface';
import { CatalogItemType } from '../shared/catalog.enum';

@Component({
  selector: 'fadq-catalog-browser',
  templateUrl: './catalog-browser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserComponent implements OnInit, OnDestroy {

  private controller: DataStoreController;

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

  @Output() layerSelect = new EventEmitter<Record<CatalogItemLayer>>();
  @Output() layerUnselect = new EventEmitter<Record<CatalogItemLayer>>();

  constructor(
    private layerService: LayerService,
    private cdRef: ChangeDetectorRef
  ) {
    this.controller = new DataStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.store.state.reset();
    this.controller.bind(this.store);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  selectLayer(item: Record<CatalogItemLayer>) {
    this.controller.updateRecordState(item, {
      selected: true,
      focused: true
    }, true);

    this.layerSelect.emit(item);
    if (this.map !== undefined) {
      this.addLayerToMap(item);
    }
  }

  isGroup(item: Record<CatalogItem>): boolean {
    return item.data.type === CatalogItemType.Group;
  }

  isLayer(item: Record<CatalogItem>): boolean {
    return item.data.type === CatalogItemType.Layer;
  }

  private addLayerToMap(item: Record<CatalogItemLayer>) {
    this.layerService.createAsyncLayer(item.data.options)
      .subscribe((layer: Layer) => {
        this.map.addLayer(layer);
      });
  }
}
