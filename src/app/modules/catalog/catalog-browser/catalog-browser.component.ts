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

import { zip } from 'rxjs';

import { Record } from '../../data/shared/data.interface';
import { DataStore } from '../../data/shared/store';
import { DataStoreController } from '../../data/shared/controller';
import {
  CatalogItem,
  CatalogItemLayer,
  CatalogItemGroup,
  CatalogItemState
} from '../shared/catalog.interface';
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
  @Output() layerAdd = new EventEmitter<Record<CatalogItemLayer>>();
  @Output() layerRemove = new EventEmitter<Record<CatalogItemLayer>>();

  constructor(
    private layerService: LayerService,
    private cdRef: ChangeDetectorRef
  ) {
    this.controller = new DataStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    const currentLayerIds = this.map.layers.map((layer: Layer) => layer.id);
    this.store.state.setByKeys(currentLayerIds, {added: true});
    this.controller.bind(this.store);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  isGroup(item: Record<CatalogItem>): boolean {
    return item.data.type === CatalogItemType.Group;
  }

  isLayer(item: Record<CatalogItem>): boolean {
    return item.data.type === CatalogItemType.Layer;
  }

  selectLayer(layer: Record<CatalogItemLayer>) {
    this.controller.updateRecordState(layer, {
      selected: true,
      focused: true,
    }, true);

    this.layerSelect.emit(layer);
  }

  addLayer(layer: Record<CatalogItemLayer>) {
    this.controller.updateRecordState(layer, {added: true}, false);
    this.addLayerToMap(layer);
  }

  removeLayer(layer: Record<CatalogItemLayer>) {
    this.controller.updateRecordState(layer, {added: false}, false);
    this.removeLayerFromMap(layer);
  }

  addGroup(group: Record<CatalogItemGroup>, items: Record<CatalogItemLayer>[]) {
    this.controller.updateRecordState(group, {added: true}, false);
    const layers = items.filter((item: Record<CatalogItem>) => {
      const added = this.store.getRecordState(item).added || false;
      return this.isLayer(item) && added === false;
    });
    this.addLayersToMap(layers);
  }

  removeGroup(group: Record<CatalogItemGroup>, items: Record<CatalogItemLayer>[]) {
    this.controller.updateRecordState(group, {added: false}, false);
    const layers = items.filter((item: Record<CatalogItem>) => {
      const added = this.store.getRecordState(item).added || false;
      return this.isLayer(item) && added === true;
      });
    this.removeLayersFromMap(layers);
  }

  private addLayerToMap(layer: Record<CatalogItemLayer>) {
    this.layerService.createAsyncLayer(layer.data.options)
      .subscribe((oLayer: Layer) => {
        this.map.addLayer(oLayer);
      });
  }

  private removeLayerFromMap(layer: Record<CatalogItemLayer>) {
    const oLayer = this.map.getLayerById(layer.data.id);
    if (oLayer !== undefined) {
      this.map.removeLayer(oLayer);
    }
  }

  private addLayersToMap(layers: Record<CatalogItemLayer>[]) {
    const layers$ = [];
    layers.forEach((layer: Record<CatalogItemLayer>) => {
      this.controller.updateRecordState(layer, {added: true}, false);
      layers$.push(this.layerService.createAsyncLayer(layer.data.options));
    });

    zip(...layers$).subscribe((oLayers: Layer[]) => {
      this.map.addLayers(oLayers);
    });
  }

  private removeLayersFromMap(layers: Record<CatalogItemLayer>[]) {
    layers.forEach((layer: Record<CatalogItemLayer>) => {
      this.controller.updateRecordState(layer, {added: false}, false);
      this.removeLayerFromMap(layer);
    });
  }
}
